import express from 'express' 
import { ConnectDb } from './database/connect';
import { routes } from "./routes/routes"



const PORT = process.env.PORT || 3333; 


const server = express()

server.use(express.json())

server.use(routes)

const startServer = () => {
  try {
    server.listen(PORT)
    console.log("Server is running on PORT: ",  PORT)

    ConnectDb("mongodb+srv://sam:1234@cluster0.m0zii1h.mongodb.net/article_db")


  } catch (error) {
    console.log(error)
  }
}

startServer()