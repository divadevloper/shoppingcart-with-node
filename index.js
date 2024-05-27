const express = require("express")
const App = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
App.use(express.urlencoded({ extended: true }))
App.set("view engine", "ejs")

let shoppinglistschema = new mongoose.Schema({
    items:{type:String,required:true},
    price:{type:Number,required:true},
    quality:{type:Number,required:true},
    subtototal:{type:Number,required:true}
})
let shoppinglistModel = mongoose.model("shopping collection",shoppinglistschema)


App.post("/",async(req,res)=>{
    console.log(req.body);
    const{items,price,quality,subtototal}= req.body
    try {
        if (!items|| !price || !quality || !subtototal) {
            console.log("input cant be empty");
        }else{
            let shopping = await shoppinglistModel.create(req.body)
            console.log(shopping);
            if (shopping) {
               console.log("shopping list created sucessfully"); 
               res.redirect("/")
            }else{
                console.log( "Error occurred while creating");
            }
        }
    } catch (error) {
        console.log(error);
    }
})

App.get("/",async(req,res)=>{

    
    let getshoppinglist = await shoppinglistModel.find()
        if (getshoppinglist) {
            console.log("Shoppin List created sucess");
        }
        else{
            console.log("shoppinglist not find");
        }
    res.render("index", { shopping: getshoppinglist})

})

App.post("/delete/:id", async (req, res) => {
    let id = req.params.id
    console.log(req.params.id);
    console.log(id);
    if (!id) {
        console.log("couldnt get id");
        return
    }
    try {
        const deleteshopping = await shoppinglistModel.findByIdAndDelete({ _id: id })
        console.log(deleteshopping);
        if (!deleteshopping) {
            console.log("couldnt be delete");
        } else {
            console.log("shopping list deleted successfully deleted");
        }
    } catch (error) {
        console.log(error);
    }
    res.redirect("/")
})


const uri = "mongodb+srv://DevDiva:Daramola2000@cluster0.sjyczz0.mongodb.net/shoppinglist?retryWrites=true&w=majority&appName=Cluster0"

const connect = ()=>{
    try {
    let connection= mongoose.connect(uri)
     if (connection) {
         console.log("connected to database");
        }else{
         console.log("error occurred");
        }
    } catch (error) {
     console.log(error);
    }
    
 }
 connect()




let port = 2006 

App.listen(port,()=>{
    console.log(`you app is starting on ${port}`)
})