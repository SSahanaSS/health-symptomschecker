from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS so React can call this API

# Set your Gemini API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@app.route('/')
def home():
    return "Welcome to Health Checker API"

@app.route('/check_symptoms', methods=['POST'])
def check_symptoms():
    data = request.get_json()
    symptoms = data.get("symptoms", "")

    print("Received symptoms:", symptoms)  # Log to console for debugging

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    prompt = f"""
Pretend you are a medical assistant. For these symptoms: {symptoms}, provide the response in **exactly this format**:

Possible Conditions
<one condition per line and small explanation>

Next Steps
<one next step per line, can include medicines if required>

Disclaimer


Do not repeat the section headers inside the content. Keep it concise. The disclaimer should say that this information is for educational purposes only.
"""


    try:
        model = genai.GenerativeModel("models/gemini-2.5-flash")
        response = model.generate_content(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)
