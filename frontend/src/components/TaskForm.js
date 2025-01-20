// TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [task, setTask] = useState({ title: '', description: '', priority: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/tasks', task)
            .then(response => alert('Task created'))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Task Title"
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Task Description"
            />
            <input
                type="text"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                placeholder="Priority"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
