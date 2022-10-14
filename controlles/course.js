const CourseModel = require("../services/course")
const codes = require("../common/codes")

 
// get All Courses
const getAllCourses = (req, res) => {
    const { sort, limit, skip, filter, select } = req.query;

    CourseModel.getAllCourses(sort, limit, skip, filter, select).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// get All Courses Count
const getAllCoursesCount = (req, res) => {
    const { filter } = req.query;

    CourseModel.getAllCoursesCount(filter).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        console.log(result);
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// create Course
const createCourse = (req, res) => {
    const { name , description , image} = req.body;

    CourseModel.createCourse( name , description , image).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Courses
const editCourse = (req, res) => {
    const {  name , description , image} = req.body;
    const { id } = req.params;

    CourseModel.editCourse(id,  name , description , image).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}


// edit Course Image
const editCourseImage = (req, res) => {
    const { image } = req.body;
    const { id } = req.params;

    CourseModel.editCourseImage(id, image).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}

// delete Course
const deleteCourse = (req, res) => {
    const { id } = req.params;

    CourseModel.deleteCourse(id).then(result => {
        res.status(codes.ok).json({ err: false, msg: result })
    }).catch(result => {
        res.status(codes.badRequest).json({ err: true, msg: result })
    })
}



module.exports = { getAllCourses, getAllCoursesCount, createCourse, editCourse, editCourseImage, deleteCourse }
