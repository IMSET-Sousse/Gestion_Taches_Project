import React, { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import TaskTable from './components/TaskTable';
import UserForm from './components/UserForm';
import TaskForm from './components/TaskForm';
import { fetchUsers, addUser, deleteUser, fetchTasks, addTask, deleteTask } from './api';

const App = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    // Charger les utilisateurs et les tâches
    useEffect(() => {
        const loadData = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData);

            const tasksData = await fetchTasks();
            setTasks(tasksData);
        };
        loadData();
    }, []);

    // Gestion des utilisateurs
    const handleAddUser = async (user) => {
        const newUser = await addUser(user);
        setUsers([...users, newUser]);
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
    };

    // Gestion des tâches
    const handleAddTask = async (task) => {
        const newTask = await addTask(task);
        setTasks([...tasks, newTask]);
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <h1>Task Management App</h1>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <div>
                    <h2>Users</h2>
                    <UserForm onSubmit={handleAddUser} editingUser={editingUser} />
                    <UserTable users={users} onEdit={setEditingUser} onDelete={handleDeleteUser} />
                </div>
                <div>
                    <h2>Tasks</h2>
                    <TaskForm onSubmit={handleAddTask} editingTask={editingTask} />
                    <TaskTable tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
                </div>
            </div>
        </div>
    );
};

export default App;
