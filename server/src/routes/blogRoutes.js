const express = require("express");
const {createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById} = require("../controllers/blogController");
const verifyUser = require("../middlewares/verifyUser");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'public/images');
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+"_"+file.originalname);
    }
});

const upload = multer({storage: storage});

router.post("/",verifyUser,upload.single('image'),createBlog);
router.get("/",verifyUser, getAllBlogs);
router.get("/:id",verifyUser, getBlogById);
router.put("/:id", verifyUser, updateBlogById);
router.delete("/:id", verifyUser, deleteBlogById);

module.exports = router;