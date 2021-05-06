let express = require("express"),
    CoursesRouter = express(),
    mongoose = require("mongoose");

CoursesRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require("../Models/CourseModel");
let courseSchema = mongoose.model("Course");

CoursesRouter.get("/list", (request, response) => {

    courseSchema.find({}, (error, result) => {
        response.send(result);
    });

})
CoursesRouter.get("/add", (request, response) => {

    courseSchema.find({}, (error, result1) => {
        console.log(result1);
        if (!error)
            response.render("courses/addcourses", { depts: result1 });

    });
})
CoursesRouter.post("/add", (request, response) => {
    let course = new courseSchema({
        _id: request.body._id,
        Name: request.body.Name,
    });
    course.save((err) => {
        if (!err) {
            courseSchema.findOne({ _id: request.body._id }, (error, result) => {

                if (!error)
                    response.send(result)
                else
                    response.send(error)
            })
        } else {
            response.send(err);
        }
    })
})
CoursesRouter.get("/details/:id", (request, response) => {

    courseSchema.findOne({ _id: request.params.id }, (error, result) => {

        if (!error)
            response.send(result)
        else
            response.send(error);
    });
})
CoursesRouter.post("/edit/:id", (request, response) => {


    courseSchema.update({ _id: request.params.id }, {
        "$set": {
            Name: request.body.Name,
        }
    }, (error) => {
        if (!error) {
            courseSchema.findOne({ _id: request.params.id }, (err, result) => {
                if (!err)
                    response.send(result)
                else
                    response.send(err);
            })
        } else {
            response.send(error)
        }
    })


})
CoursesRouter.get("/delete/:id", (request, response) => {
    courseSchema.deleteOne({ _id: request.params.id }, (error) => {
        if (!error)
            response.send({ data: "deleted" })
        else
            response.send(error);
    })
});


module.exports = CoursesRouter;