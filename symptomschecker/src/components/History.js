import React, { useEffect, useState } from "react";
import "./csscss/input.css"; // reuse existing styles

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // store selected item

  useEffect(() => {
    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching history:", err);
        setLoading(false);
      });
  }, []);

  const toggleItem = (id) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <div className="Conta">
      <div className="card input-card">
        <h2 className="chat-header">History</h2>

        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No previous symptom checks found.</p>
        ) : (
          <ul style={{ textAlign: "left", listStyle: "none", padding: 0 }}>
            {history.map((item) => (
              <li
                key={item.id}
                onClick={() => toggleItem(item.id)}
                style={{
                  marginBottom: "14px",
                  padding: "12px 14px",
                  background: "#f8faff",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow:
                    selected === item.id
                      ? "0 4px 12px rgba(0, 123, 255, 0.15)"
                      : "0 2px 6px rgba(0, 0, 0, 0.06)",
                  transition: "all 0.2s ease",
                }}
              >
                <strong>Symptoms:</strong> {item.symptom} <br />
                <small style={{ color: "#555" }}>
                  {new Date(item.timestamp).toLocaleDateString()}
                </small>

                {selected === item.id ? (
                  <div
                    style={{
                      marginTop: "10px",
                      paddingTop: "10px",
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <strong>Full Result:</strong>
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "10px",
                        marginTop: "6px",
                        color: "#334155",
                        fontSize: "14px",
                        lineHeight: "1.6",
                      }}
                    >
                      {item.result}
                    </pre>
                  </div>
                ) : (
                  <p style={{ marginTop: "6px", color: "#475569" }}>
                    {item.result.slice(0, 100)}...
                    <span
                      style={{
                        color: "#007bff",
                        fontSize: "13px",
                        marginLeft: "4px",
                      }}
                    >
                      (Click to view)
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default History;
