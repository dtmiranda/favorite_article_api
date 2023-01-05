import express from 'express' 
import { routes } from "./routes/routes"

const PORT = process.env.PORT || 3333; 


const server = express()

server.use(routes)

const startServer = () => {
  try {
    server.listen(PORT)
    console.log("Server is running on PORT: ",  PORT)

  } catch (error) {
    console.log(error)
  }
}

startServer()