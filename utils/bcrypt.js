const bcrypt = require('bcrypt');

const generateHashedPassword = (password)=>{
    return hashedPassword = bcrypt.hash(password, 10)
}

const comparePassword = (password, userPassword)=>{
    return comparedPassword = bcrypt.compare(password, userPassword)
}

module.exports = {generateHashedPassword, comparePassword};