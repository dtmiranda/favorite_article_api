
import {Request, Response} from 'express'

const puppeteer = require('puppeteer-extra')
const stealthPlugin =require('puppeteer-extra-plugin-stealth')
import { Browser, executablePath } from "puppeteer";

const Blog = require("../schemas/Blog")


//Used to make you bot looks like a "human"
puppeteer.use(stealthPlugin())


class BlogController {

  public async getAllBlogs (_request: Request, response: Response) {
    try {
      const blogs = await Blog.find()
      
      response.status(200).json(blogs)

      
    } catch (error) {
      response.status(500).json({message: error})
      
    }
    
  }




  public async storeBlog (request: Request, response: Response) {

    
    try {

      const blogUrl = request.body.blogUrl
      const blogLable = request.body.lable

      
      var blogObject = {
        lable: blogLable,
        blogUrl: blogUrl,
        articles:[{
          cover: String,
          title: String,
          articleUrl: String,
          author: String,
        }]
      }




      /* WEB CRAWLER
       * In this case is avalible only to a devGo url 
       */

      const browser: Browser = await puppeteer.launch({headless: true, executablePath: executablePath()});
      const page = await browser.newPage();
      await page.goto(blogUrl);
     
      const articleData = await page.evaluate(() => {
      
        const articleCard = Array.from(document.querySelectorAll(".blog-article-card"))

        const data = articleCard.map(
          (articles: any) => ({

            
            cover:articles.querySelector("a span img").getAttribute("src"),
            articleUrl:articles.querySelector("h1 a").getAttribute("href"),
            title: articles.querySelector("h1 a").innerText,
            author: articles.querySelector(".css-1gl67p8 a").innerText,


          
          }  )
        
        )  
        
        
        return data


      }, blogUrl)

      //console.log(articleData)

      blogObject.articles = articleData

      await browser.close(); 

/* 
      //Verify if the blog is already registered
      const isBlogRegistered = await Blog.find({blogUrl: blogObject.blogUrl});

      console.log(isBlogRegistered)

      if(isBlogRegistered){

        return  `The blog ${blogObject.blogUrl} is already registered! `

      } */

      //Save a blog data
      const blog = await Blog.create(blogObject)

      response.status(201).json({

          blog,
          message: "The blog and their respective articles are stored successfully",
          
      });


              

              
      } catch (error) {
        response.status(500).json({
          message: "Error storing blog and their articles",
          error,
        });
        
      }
 
  }




  public async findOne (request: Request, response: Response) {
    try {
      const articleId = request.params.id;
      const article = await Blog.findById(articleId, request.body)

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

  public async updateBlog (request: Request, response: Response) {
    try {
      const blogId = request.params.id;
      const blog = await Blog.findByIdAndUpdate(blogId, request.body)

      if(!blog){
        return response.status(404).json({message:"This blog does not exists!"})
      }



      response.status(200).json({
        blog,
        message: "Blog updated successfully",

      });
      
    } catch (error) {
      response.status(500).json({
        message: "Error storing link ",
        error,
      });
      
    }

  }

  public async listArticles(request: Request, response: Response){
    var articles:[]

    try {

      const blogId = request.params.id;

      const blog = await Blog.findOne({_id: blogId})

      articles = blog.articles
                              
      //console.log("Articles: ", request.body)


      if(!articles){
        return response.status(404).json({message:"This Blog does not have articles!"})
      }
 


      response.status(200).json(articles);
      
    } catch (error) {
      response.status(500).json({
        message: "Error listing articles ",
        error,
      });
      
    }
  }



  public async deleteBlog (request: Request, response: Response) {
    try {
      const blogId = request.params.id;

      const blog = await Blog.findByIdAndDelete(blogId)

      if(!blog){
        return response.status(404).json({message:"This blog does not exists!"})
      }

      response.status(201).json({
        message: "Blog deleted successfully",
      });
      
    } catch (error) {
      response.status(500).json({
        message: "Error storing link ",
        error,
      });
      
    }

  }
}

export default new BlogController()



