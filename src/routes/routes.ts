import express, { Request, Response} from 'express'

export const routes = express.Router()

routes.get('/', function (request: Request, response: Response) {
  response.send("Welcome to favorite article")
})


