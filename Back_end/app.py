<<<<<<< HEAD
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialisation de l'application Flask
=======
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 

# Initialisation de Flask et extensions
>>>>>>> c5bdccae5bed2b5f5072373a8ff4882533f46e51
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'  # Changez selon votre base de données
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)  # Permet les requêtes entre origines différentes (CORS)

<<<<<<< HEAD
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
=======
# Modèles de base de données
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    is_completed = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('tasks', lazy=True))

# Routes pour les utilisateurs
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "username": user.username, "email": user.email} for user in users])

@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created", "user": {"id": new_user.id, "username": new_user.username, "email": new_user.email}}), 201

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    user = User.query.get_or_404(user_id)
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    db.session.commit()
    return jsonify({"message": "User updated", "user": {"id": user.id, "username": user.username, "email": user.email}})

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})

# Routes pour les tâches
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        "id": task.id, 
        "title": task.title, 
        "description": task.description, 
        "is_completed": task.is_completed, 
        "user_id": task.user_id
    } for task in tasks])

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(
        title=data['title'], 
        description=data.get('description'), 
        is_completed=data.get('is_completed', False), 
        user_id=data['user_id']
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created", "task": {"id": new_task.id, "title": new_task.title, "description": new_task.description, "is_completed": new_task.is_completed, "user_id": new_task.user_id}}), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    task = Task.query.get_or_404(task_id)
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.is_completed = data.get('is_completed', task.is_completed)
    db.session.commit()
    return jsonify({"message": "Task updated", "task": {"id": task.id, "title": task.title, "description": task.description, "is_completed": task.is_completed, "user_id": task.user_id}})

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})

# Point d'entrée principal
@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask Task Management API!"})

# Initialisation de la base de données
with app.app_context():
    db.create_all()

# Lancer le serveur
>>>>>>> c5bdccae5bed2b5f5072373a8ff4882533f46e51
if __name__ == '__main__':
    app.run(debug=True)