let mongoose = require("mongoose");

let courseSchema = new mongoose.Schema({
    _id: Number,
    Name: String,

});



//mapping
mongoose.model("Course", courseSchema);
