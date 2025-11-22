import React from "react"

const Table = ({ users = [], onEdit, onDelete }) => {
  return (
    <div className='w-[90%] mx-auto mt-10 bg-[#2E2C34] p-6 rounded-2xl shadow-xl'>
      <table className='w-full border-collapse rounded-xl overflow-hidden'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => onEdit(user)}
                >
                  Update
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => onDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
