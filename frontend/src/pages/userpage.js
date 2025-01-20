import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the backend
        fetch('/users')
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const handleAddUser = (user) => {
        // Add user logic here
    };

    const handleEditUser = (user) => {
        // Edit user logic here
    };

    const handleDeleteUser = (userId) => {
        // Delete user logic here
    };

    return (
        <div>
            <h1>Users</h1>
            <UserForm onSubmit={handleAddUser} />
            <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        </div>
    );
};

export default UsersPage;
