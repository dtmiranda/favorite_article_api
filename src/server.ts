import express from 'express' 
import { ConnectDB } from './database/connect';
import { routes } from "./routes/routes"

const dotenv = require("dotenv")
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 3333; 
const DATABASE_URL = "mongodb+srv://sam:1234@cluster0.m0zii1h.mongodb.net/article_db"



dotenv.config()
dotenv.config({ path: __dirname + path.sep + '.env' });



const server = express()

server.use(cors())

server.use(express.json())

server.use(routes)

const startServer = () => {
  try {
    server.listen(PORT)
    console.log("Server is running on PORT: ",  PORT)
    
    console.log("Waiting for DB connection...")

    ConnectDB(DATABASE_URL)


  } catch (error) {
    console.log(error)
  }
}



startServer()