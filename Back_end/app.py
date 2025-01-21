from flask import Flask, request, redirect, url_for, render_template_string
from flask_sqlalchemy import SQLAlchemy

# Initialisation de l'application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modèles
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    is_completed = db.Column(db.Boolean, default=False)

# HTML et CSS intégrés
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
            flex-direction: column;
            margin-bottom: 20px;
        }

        form input, form button {
            margin-bottom: 10px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        form button {
            background-color: #5cb85c;
            color: white;
            border: none;
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

        li.completed {
            text-decoration: line-through;
            color: #6c757d;
        }

        a {
            color: #007bff;
            text-decoration: none;
            margin-left: 10px;
        }

        a.delete {
            color: #dc3545;
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
            <input type="text" name="task_title" placeholder="Titre de la tâche" required>
            <input type="text" name="task_description" placeholder="Description de la tâche">
            <button type="submit">Ajouter</button>
        </form>

        <ul>
            {% for task in tasks %}
                <li class="{{ 'completed' if task.is_completed else '' }}">
                    <span>{{ task.title }}</span> - <span>{{ task.description or 'Sans description' }}</span>
                    {% if not task.is_completed %}
                        <a href="{{ url_for('complete_task', task_id=task.id) }}">Terminer</a>
                    {% endif %}
                    <a href="{{ url_for('delete_task', task_id=task.id) }}" class="delete">Supprimer</a>
                </li>
            {% else %}
                <p>Aucune tâche disponible.</p>
            {% endfor %}
        </ul>
    </div>
</body>
</html>
'''

# Routes
@app.route('/')
def home():
    tasks = Task.query.all()
    return render_template_string(HTML_TEMPLATE, tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    title = request.form.get('task_title')
    description = request.form.get('task_description')
    if title:
        new_task = Task(title=title, description=description, is_completed=False)
        db.session.add(new_task)
        db.session.commit()
    return redirect(url_for('home'))

@app.route('/complete_task/<int:task_id>')
def complete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        task.is_completed = True
        db.session.commit()
    return redirect(url_for('home'))

@app.route('/delete_task/<int:task_id>')
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
    return redirect(url_for('home'))

# Initialisation de la base de données
with app.app_context():
    db.create_all()

# Lancer le serveur
if __name__ == '__main__':
    app.run(debug=True)
