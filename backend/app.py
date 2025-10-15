import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
CORS(app) 

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@app.route('/')
def home():
    return "Welcome to Health Checker API"


@app.route('/check_symptoms', methods=['POST'])
def check_symptoms():
    data = request.get_json()
    symptoms = data.get("symptoms", "")

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    # Prompt for LLM
    prompt = f"""Pretend you are a medical assistant. For these symptoms: {symptoms}, provide the response in exactly this format:

Possible Conditions
<one condition per line and small explanation>

Next Steps
<one next step per line, can include medicines if required>

Disclaimer


Do not repeat the section headers inside the content. Keep it concise. The disclaimer should say that this information is for educational purposes only.
"""

    try:
        # Generate response using Gemini
        model = genai.GenerativeModel("models/gemini-2.5-flash")
        response = model.generate_content(prompt)
        response_text = response.text.strip()

        
        conn = sqlite3.connect('symptoms_history.db')
        c = conn.cursor()
        c.execute('INSERT INTO history (symptom_text, result) VALUES (?, ?)', (symptoms, response_text))
        conn.commit()
        conn.close()

        return jsonify({"response": response_text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/history', methods=['GET'])
def get_history():
    conn = sqlite3.connect('symptoms_history.db')
    c = conn.cursor()
    c.execute('SELECT id, symptom_text, result, timestamp FROM history ORDER BY timestamp DESC')
    rows = c.fetchall()
    conn.close()

    history = [
        {"id": row[0], "symptom": row[1], "result": row[2], "timestamp": row[3]}
        for row in rows
    ]
    return jsonify(history)


if __name__ == '__main__':
    app.run(debug=True)
