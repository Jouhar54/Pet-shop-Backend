const userSchema = require("../../models/userSchema")

// Display all users 
const displayUsers = async (req, res) =>{
    try {
        const allUsers = await userSchema.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({message:`${error.message}`});
    }
}

// Display specified user 
const userWithId = async (req, res) =>{
    try {
        const userId = req.params.id;

        const specifiedUser = await userSchema.findById(userId);
        if(!specifiedUser){
            return res.status(404).json({message:`User not found`})
        }
        res.status(200).json(specifiedUser);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

// Delete a User
const deleteUser = async (req, res) => {
    try {
      const _id = req.params.id;
      const deletedUserList = await userSchema.findByIdAndDelete({ _id });
  
      if (!deletedUserList) {
        return res
          .status(404)
          .json({ success: false, message: `User nor found` });
      }
  
      res.status(200).json({ success: true, message: `Removed user` });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

module.exports = {displayUsers, userWithId, deleteUser}