const mongoose=require("mongoose")
const conn=async function(){
    try{
        await mongoose.connect("mongodb+srv://titansingh327:Pokemons%40123@cluster0.6xc0q.mongodb.net/").then(function(){
            console.log("Connected")
        })
    }catch(error){
        res.status(400).json({
            msg:"Database not Connected"
        })
    }
}
conn();