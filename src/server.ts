import express, {Request, Response} from 'express' 

const PORT = 3000

const server = express()


server.get('/', function (request: Request, response: Response) {
  response.send('Server is run on port ' + PORT)
})

server.listen(PORT)