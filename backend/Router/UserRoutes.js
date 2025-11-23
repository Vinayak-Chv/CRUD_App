import express from "express"
import User from "../Database/DataSchema.js"

const router = express.Router()

// CREATE
router.post("/", async (req, res) => {
    try {
        const { name, email, age, role } = req.body

        const newUser = new User({ name, email, age, role })
        await newUser.save()

        res.status(201).json({
            message: "User has been created successfully",
            data: newUser
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in creating the User",
            error: err
        })
    }
})

// READ ALL + SEARCH
router.get("/", async (req, res) => {
    try {
        const search = req.query.search || ""

        const users = await User.find({
            name: { $regex: search, $options: "i" }
        })

        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in fetching the users",
            error: err
        })
    }
})

// READ BY ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const user  = await User.findById(id)
        
        if(!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: user
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in fetching the single user",
            error: err
        })
    }
})

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, age, role } = req.body

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { name, email, age, role },
            { new: true }
        )

        if(!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            message: "User is updated",
            data: updatedUser
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in updating the user",
            error: err
        })
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        if(!deletedUser) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in deleting the data",
            error: err
        })
    }
})

export default router
