const {getAllUsers, addNewUser} = require("../db/db.js");

// const login = (email,password)=>{

// }

const register = async (newUser) =>{
    return await addNewUser(newUser);
}

module.exports = {
    register
}