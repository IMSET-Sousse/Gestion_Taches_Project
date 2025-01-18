import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Récupérer les tâches depuis l'API Flask
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Erreur de récupération des tâches:', error));
  }, []);

  // Ajouter une tâche
  const addTask = () => {
    if (newTask) {
      axios.post('http://127.0.0.1:5000/api/tasks', { name: newTask })
        .then(response => {
          setTasks([...tasks, { name: newTask, done: false }]);
          setNewTask('');
        })
        .catch(error => console.error('Erreur lors de l\'ajout de la tâche:', error));
    }
  };

  // Marquer une tâche comme terminée
  const markDone = (index) => {
    axios.put(`http://127.0.0.1:5000/api/tasks/${index}/done`)
      .then(response => {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = true;
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Erreur lors de la mise à jour de la tâche:', error));
  };

  // Supprimer une tâche
  const deleteTask = (index) => {
    axios.delete(`http://127.0.0.1:5000/api/tasks/${index}`)
      .then(response => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Erreur lors de la suppression de la tâche:', error));
  };

  return (
    <div className="App">
      <h1>Gestion des Tâches</h1>

      <input
        type="text"
        placeholder="Ajouter une tâche"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Ajouter</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.name}
            {!task.done && <button onClick={() => markDone(index)}>Terminer</button>}
            <button onClick={() => deleteTask(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
