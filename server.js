let express = require("express"),
    morgan = require("morgan"),


    StudentRouter = require("./Routers/StudentsRouter"),
    DepartmentRouter = require("./Routers/DepartmentsRouter"),

    path = require("path"),
    bodyParser = require("body-parser"),
    express_session = require("express-session"),
    connect_flash = require("connect-flash"),
    cookie_parser = require("cookie-parser"),
    mongoose = require("mongoose");
const CoursesRouter = require("./Routers/CoursrRouter");

// express_ejs_layouts=require("express-ejs-layouts");
mongoose.connect("mongodb://localhost:27017/ReactDay3");
//open server
let server = express();





/******* Routings */
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(express.static(path.join(__dirname, "publics")));
server.use(bodyParser.urlencoded());


server.use(bodyParser.json());




server.use(/\//, (request, response) => {

    // response.send("HOME");
    // response.sendFile(path.join(__dirname,"views","home.html"));
    response.render("home");
});



server.use("/Students", StudentRouter);
server.use("/Departments", DepartmentRouter);
server.use("/Course", CoursesRouter);


server.use('*', (req, res, next) => {
    res.status(404).json({ err: 'NOT_FOUND' });
});

server.use((err, req, res, next) => {

    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json(err.errors);
    }
    if (err.code === 11000) {
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if (err.message === 'UN_AUTHENTICATED') {
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).end();
});



server.listen(8080, () => {
    console.log("I am Listening ......");

});