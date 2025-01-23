from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    tasks = db.relationship('Task', backref='user', lazy=True)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    priority = db.Column(db.String(50), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


def create_sample_data():
    # Check if data already exists
    if User.query.first() is None:
        # Create sample users
        user1 = User(username='john_doe', email='john@example.com')
        user2 = User(username='jane_smith', email='jane@example.com')
        db.session.add_all([user1, user2])
        db.session.commit()

        # Create sample tasks
        task1 = Task(title='Complete project proposal', description='Write and submit the project proposal', status='In Progress', priority='High', due_date=datetime(2023, 6, 30), user_id=user1.id)
        task2 = Task(title='Review code', description='Perform code review for the latest pull request', status='To Do', priority='Medium', due_date=datetime(2023, 6, 25), user_id=user2.id)
        task3 = Task(title='Update documentation', description='Update the user manual with new features', status='To Do', priority='Low', due_date=datetime(2023, 7, 5), user_id=user1.id)
        db.session.add_all([task1, task2, task3])
        db.session.commit()

if __name__ == '__main__':
    # db.create_all()
    create_sample_data()
    app.run(debug=True)

