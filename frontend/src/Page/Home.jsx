  import { useState, useEffect } from "react"
  import axios from "axios"

  import Form from "../Components/Form"
  import Navbar from "../Components/Navbar"
  import Table from "../Components/Table"

  const Home = () => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)

    const [searchQuery, setSearchQuery] = useState("")
    const [filterRole, setFilterRole] = useState("all")

    // Fetch all users
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:3000/api/users")
      setUsers(res.data.data)
      setFilteredUsers(res.data.data)
    }

    useEffect(() => {
      fetchUsers()
    }, [])

    // Handle search + filter
    useEffect(() => {
      let temp = users

      if(searchQuery.trim() !== "") {
        temp = temp.filter((u) => 
          u.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      if(filterRole !== "all") {
        temp = temp.filter((u) => u.role === filterRole)
      }

      setFilteredUsers(temp)
    }, [searchQuery, filterRole, users])

    // Add new user
    const handleAdd = () => {
      setEditingUser(null)
      setIsFormOpen(true)
    }

    const handleFormSubmit = async (data) => {
      if(editingUser) {
        await axios.put(`http://localhost:3000/api/users/${editingUser._id}`, data)
      } else {
        await axios.post("http://localhost:3000/api/users", data)
      }

      fetchUsers()
    }

    // Update user
    const handleEdit = (user) => {
      setEditingUser(user)
      setIsFormOpen(true)
    }

    // Delete user
    const handleDelete = async (id) => {
      await axios.delete(`http://localhost:3000/api/users/${id}`)
      fetchUsers()
    }

    return (
      <div>
        <Navbar onAdd={handleAdd} onSearch={(value) => setSearchQuery(value)} onFilter={(role) => setFilterRole(role)} />
          
        <Table users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />

        <Form isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} initialData={editingUser} />
      </div>
    )
  }

  export default Home