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

    

@app.route('/gettodos', methods=['GET'])
def get_items():
    conn = get_db_connection()
    cursor = conn.cursor()
    # cursor.execute('SELECT * from todo_list;')
    # items = cursor.fetchall()
    # column_names = [desc[0] for desc in cursor.description]

    # data = [dict(zip(column_names, item)) for item in items]

    # # response = {
    # #     'data': data
    # # }

    cursor.execute('SELECT id, todo_name, todo_desc, todo_day, todo_time FROM todo_list order by todo_time asc;')
    
    todos = []
    for todo in cursor.fetchall():
        todos.append({
            'id': todo[0],
            'todo_name': todo[1],
            'todo_desc': todo[2],
            'todo_day': todo[3].strftime('%Y-%m-%d'),
            'todo_time': str(todo[4])
        })

    cursor.close()
    conn.close()
    
    # return jsonify(data)
    return jsonify(todos)

@app.route('/addtodos', methods=['POST'])
def add_item():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    # cursor.execute('INSERT INTO todo_list (descr, todo_name) VALUES (%s, %s) returning id;',
    #                (new_item['descr'], new_item['todo_name']))
    # item_id = cursor.fetchone()[0]

    cursor.execute(
        "INSERT into todo_list (todo_name, todo_desc, todo_day, todo_time) VALUES (%s, %s, %s, %s) returning id;",
        (data['title'], data['description'], data['date'], data['time'])
    )
    todo_id = cursor.fetchone()[0]

    conn.commit()
    cursor.close()
    conn.close()
    # return jsonify({'id': item_id}), 201
    return jsonify({'id': todo_id, 'title': data['title']}, 201)

@app.route('/gettodobyday', methods=['POST'])
def get_item_by_day():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "select id, todo_name, todo_desc, todo_day, todo_time from todo_list where todo_day = %s" \
        "order by todo_time asc;",
        (data['date'],)
    )

    todos = []
    for todo in cursor.fetchall():
        todos.append({
            'id': todo[0],
            'todo_name': todo[1],
            'todo_desc': todo[2],
            'todo_day': todo[3].strftime('%Y-%m-%d'),
            'todo_time': str(todo[4])
        })

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify(todos)

@app.route('/test', methods=['POST'])
def test():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "select * from todo_list where todo_day = '2025-08-18'",
        (data['date'])
    )

    todos = []
    for todo in cursor.fetchall():
        todos.append({
            'id': todo[0],
            'todo_name': todo[1],
            'todo_desc': todo[2],
            'todo_day': todo[3].strftime('%Y-%m-%d'),
            'todo_time': str(todo[4])
        })

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify(todos)
    

if __name__ == '__main__':
    app.run(debug=True)