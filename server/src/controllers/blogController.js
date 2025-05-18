const Blog = require("../models/blogModel");

const createBlog = async(req,res)=>{
    try {
            const {title, category, content, author, userId} = req.body;
            const newBlog = new Blog({title, category, content, image:req.file.filename, author, userId});
            await newBlog.save();
            res.status(201).json({success:true, message:"Blog successfully created"});
        } catch (error) {
            res.status(500).json({success:false, message:"Something went wrong.Try Later"});
        }
    
}

const getAllBlogs = async(req,res)=>{
    try {
            const blogs = await Blog.find({});
            // console.log(blogs);
            if(blogs) {
               res.status(200).json({success:true, blogs:blogs});
            } else {
                res.status(204).json({success:false, message:"No data available"});
            }
            
        } catch (error) {
            res.status(500).json({success:false, message:"Something went wrong.Try Later"});
        }
    
}

const getBlogById = async(req,res)=>{
    try {
        const id = req.params.id;    
        const blog = await Blog.findById({_id: id});
            // console.log(blogs);
            if(blog) {
               res.status(200).json({success:true, blog:blog});
            } else {
                res.status(204).json({success:false, message:"No data available"});
            }
            
        } catch (error) {
            res.status(500).json({success:false, message:"Something went wrong.Try Later"});
        }
    
}

const updateBlogById = async(req,res)=>{
    try {
        const id = req.params.id;    
        const updatedBlog = await Blog.findByIdAndUpdate({_id: id},{title:req.body.title, category:req.body.category,content:req.body.content, updatedAt:Date.now()});
            // console.log(blogs);
            if(updatedBlog) {
               res.status(200).json({success:true, message:"blog updated successfully",blog: updatedBlog});
            } else {
                res.status(404).json({success:false, message:"blog not found"});
            }
            
        } catch (error) {
            res.status(500).json({success:false, message:"Something went wrong.Try Later"});
        }
    
}

const deleteBlogById = async(req,res)=>{
    try {
        const id = req.params.id;    
        const deletedBlog = await Blog.findByIdAndDelete({_id: id});
            // console.log(blogs);
            if(deletedBlog) {
               res.status(200).json({success:true, message:"blog deleted successfully"});
            } else {
                res.status(404).json({success:false, message:"blog not found"});
            }
            
        } catch (error) {
            res.status(500).json({success:false, message:"Error deleting blog.Try Later"});
        }
    
}

module.exports = {createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById};