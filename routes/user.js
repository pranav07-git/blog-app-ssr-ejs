const {Router} = require("express");
const {handelGetUserSignIn, handelGetUserSignUp, handelPostUserSignUp, handelPostUserSignIn, handelGetUserLogOut} = require("../controllers/user")

const router = Router();

router.get("/signin", handelGetUserSignIn)
router.get("/signup", handelGetUserSignUp)

router.post("/signup", handelPostUserSignUp)
router.post("/signin", handelPostUserSignIn)

router.get("/logout", handelGetUserLogOut)
 
module.exports = router;