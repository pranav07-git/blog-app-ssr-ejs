const JWT = require("jsonwebtoken")
const secret = "uDVil/n8D3xASiu2JFpG+v1EpJQZ7gOPC57546T49P0="

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}


function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken,
}