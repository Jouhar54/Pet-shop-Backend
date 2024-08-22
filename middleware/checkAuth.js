const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next)=>{
    try {
        const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            message: `Access denied`
        })
    }

    const tokenValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if(!tokenValid){
        return res.status(500).json({message:`Token not valid`});
    }

    next()
    } catch (error) {
        res.status(401).json(error.message);
    }
}

module.exports = checkAuth;