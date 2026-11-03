const {Router} = require("express");
const {handelGetBlogAdd, handelPostBlogDisplay, handelGetBlogDisplay, handelPostComment, handelDeleteComment} = require("../controllers/blog")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  }
});
const upload = multer({storage: storage})
const router = Router();

router.get("/add-new", handelGetBlogAdd)
router.post("/", upload.single("coverImage") , handelPostBlogDisplay)
router.get("/:id", handelGetBlogDisplay)
router.post("/comment/:blogId", handelPostComment)
router.delete("/comment/:id", handelDeleteComment)
module.exports = router;