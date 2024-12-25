const router=require("express").Router()
const User=require("../model/user")
const List=require("../model/list")
//create
router.post("/addTask",async function(req,res){
    try{
const {title,body,id}=req.body
const existingUser=await User.findById(id)
if(existingUser){
    const list=new List({title,body,user:existingUser})
    await list.save().then(function(){
        res.status(200).send("Done!!!")
    })
    existingUser.list.push(list)
  await existingUser.save().then(function(){
    res.status(200).json({msg:"Task added successfully!!!"})
  })
}
    }catch(err){
console.log(err)
    }

})
//update
router.put("/updateTask/:id",async function(req,res){
try{
const { title,body }=req.body


   const list= await List.findByIdAndUpdate(req.params.id,{title:title,body:body})
     await list.save().then(function(){
        res.status(200).json({
            msg:"Todo updated successfully"
        })
    })

}catch(err){
console.log(err)
}
})
//delete
router.delete("/deleteTask/:id",async function(req,res){
const existingUser=await User.findByIdAndUpdate(req.body.id,{$pull:{list:req.params.id}})
if(existingUser){
    await List.findByIdAndDelete(req.params.id).then(function(){
        res.status(200).json({
            msg:"Task deleted successfully"
        })
    })
   
}
})
//getTask
router.get("/getTask/:id",async function(req,res){
try{
const list=await List.find({user:req.params.id}).sort({createdAt:-1})
if(list.length===0){
    res.status(200).json({
        msg:"No tasks added"
    })
}
res.status(200).json({
    list
})
}catch(err){
    console.log(err)
}
})
module.exports=router