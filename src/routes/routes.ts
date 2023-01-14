import express, { Request, Response} from 'express'
import ArticleController from '../controllers/BlogController'


export const routes = express.Router()

routes.get('/articles', ArticleController.getAllArticles)
routes.get('/articles/:id', ArticleController.findOne)
routes.post('/articles', ArticleController.storeArticle)
routes.put("/articles/:id", ArticleController.updateArticle)
routes.delete("/articles/:id", ArticleController.deleteArticle)


