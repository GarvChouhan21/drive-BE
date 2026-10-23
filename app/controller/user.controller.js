const userModel = require('../model/user.model')

module.exports.signup = async (req,res)=>{
    try{
        let {firstname,email,password} = req.body

        if(!firstname || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        let user = await userModel.findOne({email})

        if(user){
            return res.status(400).json({message:"User already exists"})
        }

        user = await userModel.create({firstname,email,password})

        return res.status(200).json({message:"User created successfully",user})
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
} 