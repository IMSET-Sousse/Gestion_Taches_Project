from flask import Flask, render_template_string, request, redirect, url_for

app = Flask(__name__)

# Liste de tâches (pour l'exemple, on utilise une liste en mémoire)
tasks = []

# Code HTML pour la page index.html, inclus directement dans app.py
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion des Tâches</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        form input {
            width: 80%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        form button {
            width: 15%;
            padding: 10px;
            background-color: #5cb85c;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        form button:hover {
            background-color: #4cae4c;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin-bottom: 10px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        li.done {
            text-decoration: line-through;
            color: #6c757d;
        }

        a {
            color: #007bff;
            text-decoration: none;
            margin-left: 10px;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Gestion des Tâches</h1>
        
        <form action="{{ url_for('add_task') }}" method="POST">
            <input type="text" name="task_name" placeholder="Ajouter une tâche..." required>
            <button type="submit">Ajouter</button>
        </form>

        <ul>
            {% for task in tasks %}
                <li class="{{ 'done' if task['done'] else '' }}">
                    {{ task['name'] }}
                    {% if not task['done'] %}
                        <a href="{{ url_for('mark_done', task_index=loop.index0) }}">Marquer comme terminée</a>
                    {% endif %}
                    <a href="{{ url_for('delete_task', task_index=loop.index0) }}">Supprimer</a>
                </li>
            {% else %}
                <p>Aucune tâche à afficher.</p>
            {% endfor %}
        </ul>
    </div>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE, tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task_name = request.form.get('task_name')
    if task_name:
        tasks.append({'name': task_name, 'done': False})
    return redirect(url_for('index'))

@app.route('/mark_done/<int:task_index>')
def mark_done(task_index):
    if 0 <= task_index < len(tasks):
        tasks[task_index]['done'] = True
    return redirect(url_for('index'))

@app.route('/delete/<int:task_index>')
def delete_task(task_index):
    if 0 <= task_index < len(tasks):
        tasks.pop(task_index)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
