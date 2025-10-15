# Health Symptom Checker

A simple web-based symptom checker application that takes user symptoms as input and provides possible conditions, next steps, and a disclaimer. Built with Flask, SQLite, and Google Gemini API.

---

## Features
- Input symptoms and get probable conditions.
- Provides next steps and recommendations.
- Stores history of checks in SQLite database.
- REST API with CORS support.

---

## Tech Stack
- **Backend:** Python, Flask, SQLite
- **AI Integration:** Google Generative AI (Gemini)
- **Frontend:** ReactJS 
- **Environment Variables:** python-dotenv

---

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/SSahanaSS/health-symptomschecker.git
cd health-symptomschecker
```


2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Create .env file with your Google API key**

4. **Run the Flask app:**
```bash

python app.py
```
5. **Run the frontend**
```bash
npm start
```

---

## API Endpoints

--GET / – Home route

--POST /check_symptoms – Send symptoms and get response

--GET /history – Retrieve previous symptom checks

---

## Example Output
![alt text](./example%20images/image.png)
![alt text](./example%20images/image-1.png)
![alt text](./example%20images/image-2.png)
![alt text](./example%20images/image-3.png)
![alt text](./example%20images/image-4.png)


## Disclaimer

**This tool is for educational purposes only. It is not a substitute for professional medical advice.**

