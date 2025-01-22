import React, { useState, useEffect } from "react"
import axios from "axios"

function TaskTable() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState({ status: "", priority: "", assignee: "" })
  const [sortBy, setSortBy] = useState({ field: "", direction: "asc" })

  const fetchTasks = () => {
    setLoading(true)
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error)
        setError("Failed to fetch tasks. Please try again later.")
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const filteredAndSortedTasks = tasks
    .filter(
      (task) =>
        (!filter.status || task.status === filter.status) &&
        (!filter.priority || task.priority === filter.priority) &&
        (!filter.assignee || task.assignee === filter.assignee),
    )
    .sort((a, b) => {
      if (sortBy.field) {
        if (a[sortBy.field] < b[sortBy.field]) return sortBy.direction === "asc" ? -1 : 1
        if (a[sortBy.field] > b[sortBy.field]) return sortBy.direction === "asc" ? 1 : -1
      }
      return 0
    })

  if (loading) return <div className="text-center text-indigo-600">Loading tasks...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Tasks</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">A list of all tasks in the system.</p>
      </div>
      <div className="mb-4 flex flex-wrap gap-4">
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={sortBy.field}
          onChange={(e) => setSortBy({ field: e.target.value, direction: "asc" })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Sort By</option>
          <option value="due_date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {filteredAndSortedTasks.map((task) => (
            <li key={task.id} className="px-4 py-4 sm:px-6 hover:bg-indigo-50 transition duration-150 ease-in-out">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-indigo-600 truncate">{task.title}</p>
                  <p className="text-sm text-gray-500 truncate">{task.description}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.status === "To Do"
                        ? "bg-yellow-100 text-yellow-800"
                        : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Due {new Date(task.due_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {task.assignee}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TaskTable

