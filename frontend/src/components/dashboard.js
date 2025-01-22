import React, { useState, useEffect } from "react"
import axios from "axios"

function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    upcomingTasks: 0,
    overdueTasks: 0,
  })

  const fetchData = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        const tasks = response.data
        const now = new Date()
        const completedTasks = tasks.filter((task) => task.status === "Done").length
        const upcomingTasks = tasks.filter((task) => new Date(task.due_date) > now && task.status !== "Done").length
        const overdueTasks = tasks.filter((task) => new Date(task.due_date) < now && task.status !== "Done").length

        setStats({
          totalTasks: tasks.length,
          completedTasks,
          upcomingTasks,
          overdueTasks,
        })
      })
      .catch((error) => console.error("Error fetching tasks:", error))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Total Tasks" value={stats.totalTasks} />
          <DashboardCard title="Completed Tasks" value={stats.completedTasks} color="green" />
          <DashboardCard title="Upcoming Tasks" value={stats.upcomingTasks} color="blue" />
          <DashboardCard title="Overdue Tasks" value={stats.overdueTasks} color="red" />
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, color = "indigo" }) {
  return (
    <div className={`bg-${color}-50 overflow-hidden shadow rounded-lg`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`bg-${color}-500 rounded-md p-3`}>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

