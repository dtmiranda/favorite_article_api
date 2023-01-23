import express, { Request, Response} from 'express'
import BlogController from '../controllers/BlogController'


export const routes = express.Router()

routes.get('/blogs', BlogController.getAllBlogs)
routes.get('/blog/:id/articles', BlogController.listArticles)
routes.post('/blogs', BlogController.storeBlog)
routes.put("/blog/:id", BlogController.updateBlog)
routes.delete("/blog/:id", BlogController.deleteBlog)


