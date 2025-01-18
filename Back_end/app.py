from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Liste de tâches (pour l'exemple, on utilise une liste en mémoire)
tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

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
