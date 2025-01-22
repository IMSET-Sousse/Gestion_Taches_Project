import React from "react"

function Navbar({ setActiveSection }) {
  return (
    <nav className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-md rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span
            className="text-2xl font-semibold text-indigo-600 cursor-pointer"
            onClick={() => setActiveSection("dashboard")}
          >
            TaskFlow
          </span>
          <div className="flex space-x-4">
            <NavLink onClick={() => setActiveSection("dashboard")}>Dashboard</NavLink>
            <NavLink onClick={() => setActiveSection("tasks")}>Tasks</NavLink>
            <NavLink onClick={() => setActiveSection("users")}>Users</NavLink>
            <NavLink onClick={() => setActiveSection("addTask")}>Add Task</NavLink>
            <NavLink onClick={() => setActiveSection("addUser")}>Add User</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ onClick, children }) {
  return (
    <span
      onClick={onClick}
      className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out cursor-pointer"
    >
      {children}
    </span>
  )
}

export default Navbar

