const API_URL = "http://127.0.0.1:5000/api"; // L'URL de votre back-end Flask

// Utilisateurs
export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw new Error("Failed to fetch users");
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

export const addUser = async (user) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Failed to add user");
        return await response.json();
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

export const updateUser = async (id, user) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Failed to update user");
        return await response.json();
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete user");
        return await response.json();
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

// Tâches
export const fetchTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        return await response.json();
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

export const addTask = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Failed to add task");
        return await response.json();
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Failed to update task");
        return await response.json();
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete task");
        return await response.json();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
