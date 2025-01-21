import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import { fetchUsers, addUser, deleteUser, fetchTasks, addTask, deleteTask } from './api';

const App = () => {
    const [currentView, setCurrentView] = useState('users');
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    // Fetch users and tasks on component mount
    useEffect(() => {
        const loadData = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData);

            const tasksData = await fetchTasks();
            setTasks(tasksData);
        };
        loadData();
    }, []);

    // Navigation handler
    const handleNavigation = (view) => {
        setCurrentView(view);
    };

    // User management handlers
    const handleAddUser = async (user) => {
        const newUser = await addUser(user);
        setUsers([...users, newUser]);
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
    };

    // Task management handlers
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
            <Navbar onNavigate={handleNavigation} />
            <div style={{ padding: '20px' }}>
                {currentView === 'users' && (
                    <div>
                        <h1>Manage Users</h1>
                        <UserForm onSubmit={handleAddUser} editingUser={editingUser} />
                        <UserTable users={users} onEdit={setEditingUser} onDelete={handleDeleteUser} />
                    </div>
                )}
                {currentView === 'tasks' && (
                    <div>
                        <h1>Manage Tasks</h1>
                        <TaskForm onSubmit={handleAddTask} editingTask={editingTask} />
                        <TaskTable tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
