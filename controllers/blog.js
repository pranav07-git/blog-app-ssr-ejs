const Blog = require("..//models/blog")
const Comment = require("..//models/comment")


function handelGetBlogAdd(req, res){
    return res.render("addBlog", {
        user: req.user,
    })
}

async function handelPostBlogDisplay(req, res){
    const {title, body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
}

async function handelGetBlogDisplay(req, res){
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId: req.params.id}).populate("createdBy");
    return res.render("blog", {
        user: req.user,
        blogs: blog,
        comments: comments,
    })
}

async function handelPostComment(req, res){
    const {content} = req.body;
    const {_id} = req.user;
    const {blogId} = req.params;
    await Comment.create({
        content: content,
        blogId: blogId,
        createdBy: _id,
    });

    return res.redirect(`/blog/${blogId}`)
}

async function handelDeleteComment(req, res){
    const {id} = req.params;
    const {_id} = req.user;
    
    const comment = await Comment.findOneAndDelete({
        _id: id,
        createdBy: _id,
    })
    const {blogId} = comment;
    if (!comment) {
        return res.status(403).send("Not authorized");
    }
    return res.redirect(`/blog/${blogId}`)
}
module.exports = {
    handelGetBlogAdd,
    handelPostBlogDisplay,
    handelGetBlogDisplay,
    handelPostComment,
    handelDeleteComment
};