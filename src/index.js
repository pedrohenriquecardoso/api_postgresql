import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import errorHandling from "./middlewares/errorHandler.js"
import createUserTable from "./data/createUserTable.js"

dotenv.config();

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

app.use(errorHandling)

createUserTable()

app.use("/api", userRoutes)

app.get("/", async(req, res)=>{
    const result = await pool.query("SELECT current_database()")
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})