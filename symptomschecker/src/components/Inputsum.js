import React, { useState } from "react";
import "./csscss/input.css";

function Inputsum() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Clean, reliable parser
  function parseLLMResponse(text) {
    const sections = { conditions: [], next_steps: [], disclaimer: "" };

    // 🔧 Use lazy (non-greedy) matching and capture only the first instance
    const condMatch = text.match(/Possible Conditions\s*([\s\S]*?)(?=\n?Next Steps|$)/i);
    const nextMatch = text.match(/Next Steps\s*([\s\S]*?)(?=\n?Disclaimer|$)/i);
    const discMatch = text.match(/Disclaimer\s*([\s\S]*)/i);

    // ✅ Split by newline, filter empty lines, and remove repeating headers
    const splitLines = (str) => {
      if (!str) return [];
      return str
        .split(/\n+/)
        .map((s) => s.replace(/\*\*|:|\*/g, "").trim())
        .filter(
          (line) =>
            line &&
            !/^possible conditions$/i.test(line) &&
            !/^next steps$/i.test(line) &&
            !/^disclaimer$/i.test(line)
        );
    };

    sections.conditions = splitLines(condMatch ? condMatch[1] : "");
    sections.next_steps = splitLines(nextMatch ? nextMatch[1] : "");
    sections.disclaimer = discMatch
      ? discMatch[1].replace(/\*\*|:|\*/g, "").trim()
      : "";

    return sections;
  }

  // ✅ Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/check_symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptom }),
      });

      const data = await response.json();
      if (response.ok) {
        const parsed = parseLLMResponse(data.response);
        setResult(parsed);
      } else {
        setResult({ error: data.error });
      }
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Conta">
      {/* Input Card */}
      <form onSubmit={handleSubmit} className="card input-card">
        <label className="chat-header">Enter your symptoms</label>
        <input
          type="text"
          value={symptom}
          className="message-input"
          onChange={(e) => setSymptom(e.target.value)}
        />
        <button type="submit" className="send-button">
          {loading ? "Analyzing..." : "Check Symptoms"}
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Results */}
      {result && !result.error && (
        <div className="result-container">
          <div className="card section">
            <h3>Possible Conditions</h3>
            <ul>
              {result.conditions.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="card section">
            <h3>Next Steps</h3>
            <ul>
              {result.next_steps.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="card section disclaimer-card">
            <h3>Disclaimer</h3>
            <p>{result.disclaimer}</p>
          </div>
        </div>
      )}

      {/* Error */}
      {result && result.error && (
        <p style={{ color: "red", marginTop: "15px" }}>{result.error}</p>
      )}
    </div>
  );
}

export default Inputsum;
