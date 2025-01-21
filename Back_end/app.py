from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialisation de l'application Flask
app = Flask(__name__)

# Configuration de la base de données (ici, une base SQLite locale)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Définition du modèle Task
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    deadline = db.Column(db.String(20), nullable=True)
    status = db.Column(db.String(20), default='en cours')

    def __repr__(self):
        return f'<Task {self.title}>'

# Initialisation de la base de données (si nécessaire)
@app.before_first_request
def create_tables():
    db.create_all()

# Route principale pour afficher les tâches
@app.route('/')
def index():
    tasks = Task.query.all()  # Récupérer toutes les tâches
    return render_template('index.html', tasks=tasks)

# Route pour ajouter une tâche
@app.route('/add', methods=['POST'])
def add_task():
    title = request.form['title']
    description = request.form.get('description')
    deadline = request.form.get('deadline')

    new_task = Task(title=title, description=description, deadline=deadline)
    db.session.add(new_task)
    db.session.commit()

    return redirect(url_for('index'))

# Route pour modifier une tâche
@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update_task(id):
    task = Task.query.get(id)

    if request.method == 'POST':
        task.title = request.form['title']
        task.description = request.form['description']
        task.deadline = request.form['deadline']
        task.status = request.form['status']

        db.session.commit()
        return redirect(url_for('index'))

    return render_template('update.html', task=task)

# Route pour supprimer une tâche
@app.route('/delete/<int:id>', methods=['POST'])
def delete_task(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()

    return redirect(url_for('index'))

# Route pour la page d'ajout de tâche
@app.route('/add-task')
def add_task_page():
    return render_template('add_task.html')

# Lancer l'application
if __name__ == '__main__':
    app.run(debug=True)