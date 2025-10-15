import sqlite3

conn = sqlite3.connect('symptoms_history.db')
c = conn.cursor()

c.execute('''
CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symptom_text TEXT NOT NULL,
    result TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

conn.commit()
conn.close()
print("Database and table created!")
