let mongoose=require("mongoose")
let userSchema=new mongoose.Schema({

    fullname :{
        firstname :{
            type:String,
            required:true,
            minLength:3,
            maxLength:20
        },
        lastname :{
            type:String,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        select:false
    },
   socketId:{
    type:String
   }
})


userSchema.methods.generateToken=async function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:"1h"})
}

userSchema.method.comparePassword =async function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.method.hashPassword =async function(password){
    return bcrypt.hash(password,10)
}

let User=mongoose.model("User",userSchema)
module.exports=User
