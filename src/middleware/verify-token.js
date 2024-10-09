import jsonwebtoken from "jsonwebtoken"


export const verifyToken = (request, response, next) => {
    let token
    let authHeaders = request.headers['authorization']
    console.log("authheaders", authHeaders)

    if(authHeaders && authHeaders.startsWith("Bearer")) {
        token = authHeaders.split(" ")[1]
    }

    console.log(token)

    if(!token) {
        return response.status(401).json({message: "No token, authorization required"})
    }

    try {
        const decode = jsonwebtoken.verify(token, "my-secret-key")
        request.user = decode
        console.log("The decoded user", request.user)
        next()
    } catch(err) {
        return response.status(400).json({message: "Token is not valid"})
    }
}