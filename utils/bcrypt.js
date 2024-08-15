const bcrypt = require('bcrypt');
const generateHashedPassword = async (password)=>{
    return hashedPassword = await bcrypt.hash(password)
}

