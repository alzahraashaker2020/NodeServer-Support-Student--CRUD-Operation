let express = require("express"),
    DepartmentRouter = express.Router(),
    mongoose = require("mongoose");


DepartmentRouter.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


require("../Models/DepartmentModel")
require("../Models/StudentModel")

let departmentSchema = mongoose.model("Departments");

DepartmentRouter.get("/list", (request, response) => {

    departmentSchema.find({}, (error, result) => {
        response.send(result);
    });

})
DepartmentRouter.get("/add", (request, response) => {

    departmentSchema.find({}, (error, result) => {
        // console.log(result1);
        if (!error)
            response.render("departments/adddepertment", { depts: result });

    });
})
DepartmentRouter.post("/add", (request, response) => {
    let dept = new departmentSchema({
        _id: request.body._id,
        Name: request.body.Name,
    });
    dept.save((err) => {
        if (!err) {
            departmentSchema.findOne({ _id: request.body._id }, (error, result) => {

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
DepartmentRouter.get("/details/:id", (request, response) => {

    departmentSchema.findOne({ _id: request.params.id }, (error, result) => {

        if (!error)
            response.send(result)
        else
            response.send(error);
    });
})
DepartmentRouter.get("/delete/:id", (request, response) => {
    departmentSchema.deleteOne({ _id: request.params.id }, (error) => {
        if (!error)
            response.send({ data: "deleted" })
        else
            response.send(error);
    })
});
DepartmentRouter.post("/edit/:id", (request, response) => {
    departmentSchema.update({ _id: request.params.id }, {
        "$set": {
            
            Name: request.body.Name,
        }
    }, (error) => {
        if (!error) {
            departmentSchema.findOne({ _id: request.params.id }, (err, result) => {
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




module.exports = DepartmentRouter;