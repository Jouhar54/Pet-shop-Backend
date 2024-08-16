const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next)=>{
    try {
        const token = req.headers.authorization;

    if(!token){
        res.status(401).json({
            message: `Access denied`
        })
    }

    const tokenValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    next()
    } catch (error) {
        res.status(401).json(`You are unauthorized`);
    }
}

module.exports = checkAuth;