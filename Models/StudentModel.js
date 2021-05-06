let mongoose=require("mongoose");

let studentSchema=new mongoose.Schema({
    _id:Number,
    Name:String,
    Email:String,
    Department:{
        type:Number,
        ref:"Departments"
    }
});



//mapping
mongoose.model("Students",studentSchema);