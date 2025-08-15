from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import sql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DB_HOST = 'localhost'
DB_NAME = 'postgres'
DB_USER = 'postgres'
DB_PASS = 'Qwerty123'

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            options='-c client_encoding=UTF8'
        )
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")

    

@app.route('/getitems', methods=['GET'])
def get_items():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * from items;')
    items = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]

    data = [dict(zip(column_names, item)) for item in items]

    response = {
        'data': data
    }

    cursor.close()
    
    conn.close()
    print(jsonify(response))
    return jsonify(data)

@app.route('/additem', methods=['POST'])
def add_item():
    new_item = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO items (descr, todo_name) VALUES (%s, %s) returning id;',
                   (new_item['descr'], new_item['todo_name']))
    item_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'id': item_id}), 201

@app.route('/test', methods=['GET'])
def test():
    print("hello world")
    return jsonify('test: test')
    

if __name__ == '__main__':
    app.run(debug=True)