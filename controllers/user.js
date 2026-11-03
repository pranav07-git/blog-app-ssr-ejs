const User = require("../models/user")
function handelGetUserSignIn(req, res) {
    return res.render("signin")
}
function handelGetUserSignUp(req, res) {
    return res.render("signup")
}
async function handelPostUserSignUp(req, res){
    const {fullName, email, password} = req.body;
    // console.log(req.body);
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/user/signin");
}

async function handelPostUserSignIn(req, res){
    const {email, password} = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password);
        if(!token) return res.redirect("/user/signin");
        console.log(`token ${token}`);
        return res.cookie("token", token).redirect("/");
    }
    catch(error){
        return res.render("signin", {
            error: `incorrect email or passoword${error}`
        })
    }
}

function handelGetUserLogOut(req, res){
    res.clearCookie("token").redirect("/")
}
module.exports = {
    handelGetUserSignIn,
    handelGetUserSignUp,
    handelPostUserSignUp,
    handelPostUserSignIn,
    handelGetUserLogOut
}