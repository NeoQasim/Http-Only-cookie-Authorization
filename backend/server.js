import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import UserRoutes from './routes/UserRoutes.js'
import { errorHandler } from "./middlewares/errorMiddleware.js"
import connectDB from "./config/db.js";
dotenv.config() //this line will actually load the enviornment variables from .env 
connectDB()
const app = express()
const port = process.env.PORT
app.use(errorHandler)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", UserRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))