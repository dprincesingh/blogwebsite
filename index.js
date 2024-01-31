import express, { urlencoded }  from'express'
import path from "path"
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import userroute from "./routes/user.js"
import { chekcforauthcooke } from './middleware/auth.js'
const app = express()
const port = 3000


app.set("view engine" , "ejs")
app.set("views", path.resolve("./","views"))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(chekcforauthcooke("uid"))
app.use("/",userroute)




mongoose.
connect("mongodb://localhost:27017/shorturlservice")
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.error(`something went worng : ${err}`))













app.listen(port, () => console.log(`Port is running at http://localhost:${port}/home`))