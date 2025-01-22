import React, { useState } from "react"
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import TaskTable from "./components/TaskTable"
import UserTable from "./components/UserTable"
import TaskForm from "./components/TaskForm"
import UserForm from "./components/UserForm"

function App() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "tasks":
        return <TaskTable />
      case "users":
        return <UserTable />
      case "addTask":
        return <TaskForm />
      case "addUser":
        return <UserForm />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar setActiveSection={setActiveSection} />
        <main className="py-10">{renderActiveSection()}</main>
      </div>
    </div>
  )
}

export default App

