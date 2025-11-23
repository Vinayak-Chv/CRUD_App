import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Database/Connection.js"
import router from "./Router/UserRoutes.js"

dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cors())

app.use("/api/users", router)

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server is Listening...")
    })
}).catch(err => console.log(err))