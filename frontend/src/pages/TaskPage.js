import React, { useState, useEffect } from 'react';
import TaskTable from '../components/TaskTable';
import TaskForm from '../components/TaskForm';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the backend
        fetch('/tasks')
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    const handleAddTask = (task) => {
        // Add task logic here
    };

    const handleEditTask = (task) => {
        // Edit task logic here
    };

    const handleDeleteTask = (taskId) => {
        // Delete task logic here
    };

    return (
        <div>
            <h1>Tasks</h1>
            <TaskForm onSubmit={handleAddTask} />
            <TaskTable tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        </div>
    );
};

export default TasksPage;
