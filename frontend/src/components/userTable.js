import React, { useState, useEffect } from "react"
import axios from "axios"

function UserTable() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = () => {
    setLoading(true)
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
        setError("Failed to fetch users. Please try again later.")
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <div className="text-center text-indigo-600">Loading users...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Users</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">A list of all users in the system.</p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-indigo-50 transition duration-150 ease-in-out">
              <div className="flex items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-indigo-600 truncate">{user.username}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserTable

