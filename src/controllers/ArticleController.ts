
import {Request, Response} from 'express'

const Article = require("../schemas/Article")

class ArticleController {

  public async getAllArticles (request: Request, response: Response) {
    try {
      const article = await Article.find()
      response.status(200).json({article})

      
    } catch (error) {
      response.status(500).json({message: error})
      
    }
    
  }

  public async storeArticle (request: Request, response: Response) {
    try {
      const article = await Article.create(request.body)

      response.status(201).json({
        article,
        message: "Article link stored successfully",
        
      });
      
    } catch (error) {
      response.status(500).json({
        message: "Error storing link ",
        error,
      });
      
    }

  }

  public async updateArticle (request: Request, response: Response) {
    try {
      const articleId = request.params.id;
      const article = await Article.findByIdAndUpdate(articleId, request.body)

      if(!article){
        return response.status(404).json({message:"This article does not exists!"})
      }



      response.status(200).json({
        article,
        message: "Article link updated successfully",

      });
      
    } catch (error) {
      response.status(500).json({
        message: "Error storing link ",
        error,
      });
      
    }

  }



  public async deleteArticle (request: Request, response: Response) {
    try {
      const articleId = request.params.id;

      const article = await Article.findByIdAndDelete(articleId)

      if(!article){
        return response.status(404).json({message:"This article does not exists!"})
      }

      response.status(201).json({
        message: "Article link deleted successfully",
      });
      
    } catch (error) {
      response.status(500).json({
        message: "Error storing link ",
        error,
      });
      
    }

  }
}

export default new ArticleController()



