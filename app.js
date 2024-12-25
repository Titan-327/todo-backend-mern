const express=require("express")
const app=express()
const cors=require("cors")
require("./conn/conn.js")
const auth=require("./routes/auth.js")
const list=require("./routes/list.js")
app.use(express.json())
app.use(cors())
app.get("/",function(req,res){
    res.send("hi")
})
app.use("/api/v1",auth)
app.use("/api/v2",list)
app.listen(3000,function(){
    console.log("Active")
})