import  Jwt  from "jsonwebtoken";

const secretkey = "Prince@$07"


function createTokenForUser(user){
    const payload = {
        name:user.name,
        _id:user._id,
        email: user.email,
        profileimageurl:user.profileimageurl,
        role:user.role 

    }
    const token = Jwt.sign(payload,secretkey)
    return token 
}


function validatetoken (token){
    const  payload = Jwt.verify(token,secretkey)
    return payload
}

export {
    createTokenForUser,
    validatetoken
}