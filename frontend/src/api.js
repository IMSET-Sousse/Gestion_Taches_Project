import axios from "axios"

const API_URL = "http://127.0.0.1:5000/api" // L'URL de votre back-end Flask

// Configuration d'axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await api.get("/users")
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export const addUser = async (user) => {
  try {
    const response = await api.post("/users", user)
    return response.data
  } catch (error) {
    console.error("Error adding user:", error)
    throw error
  }
}

export const updateUser = async (id, user) => {
  try {
    const response = await api.put(`/users/${id}`, user)
    return response.data
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`)
    return response.data
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}

// Tâches
export const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks")
    return response.data
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw error
  }
}

export const addTask = async (task) => {
  try {
    const response = await api.post("/tasks", task)
    return response.data
  } catch (error) {
    console.error("Error adding task:", error)
    throw error
  }
}

export const updateTask = async (id, task) => {
  try {
    const response = await api.put(`/tasks/${id}`, task)
    return response.data
  } catch (error) {
    console.error("Error updating task:", error)
    throw error
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error
  }
}

