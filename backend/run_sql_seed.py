import psycopg2
from psycopg2 import sql
import os

# Get database URI from config var
DATABASE_URI = os.getenv('DATABASE_URI')

# Read SQL file, edit file path if needed
with open('synergy_data.sql', 'r') as file:
    sql_commands = file.read()

# Connect to the PostgreSQL database
conn = psycopg2.connect(DATABASE_URI)
cur = conn.cursor()

# Execute the SQL commands
try:
    cur.execute(sql.SQL(sql_commands))
    conn.commit()
    print("Synergy data seeded.")
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    cur.close()
    conn.close()