const router=require("express").Router()
const User=require("../model/user")
const bcryptjs=require("bcryptjs")
//Sign up
router.post("/signup",async function(req,res){
    try{
const { email,username,password}=req.body
const hashedpass=bcryptjs.hashSync(password) 
const user= new User({email,username,password:hashedpass})
await user.save().then(function(){
    res.status(200).json({msg:"User Created Successfully!!!"})
})
    }catch(error){
res.status(200).json({
    msg:"User Not Created!!!"
})
    }
})
//Sign in
router.post("/signin",async function(req,res){
    try{
const { email, username,password}=req.body
const user=await User.findOne({email:req.body.email})
if(!user){
    res.status(200).json({msg:"Please Signup first"})
}
const isPasswordCorrect=bcryptjs.compareSync(req.body.password,user.password)
if(!isPasswordCorrect){
    res.status(200).json({
        msg:"Password is not correct"
    })
}
res.status(200).json({
    user
})
}catch(err){
console.log(err)
    }
})

module.exports=router