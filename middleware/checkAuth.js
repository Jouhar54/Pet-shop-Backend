const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next)=>{
    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({
            message: `Access denied`
        })
    }
}