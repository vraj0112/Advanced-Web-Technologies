const express = require('express');
const app = express();
const cors = require('cors'); //Cross-Origin Resource Sharing vs Same-Origin Policy (SOP).
const dotenv = require('dotenv');
dotenv.config();

const DBService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// create
app.post('/insert', (request, response) => {
    const { courseId, courseName, departmentName, instituteName, universityName } = request.body;
    const db = DBService.getDbServiceInstance();
    
    const result = db.insertNewCourse(courseId, courseName, departmentName, instituteName, universityName);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = DBService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = DBService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// update
app.patch('/update', (request, response) => {
    const { id, courseId, courseName, departmentName, instituteName, universityName } = request.body;
    const db =DBService.getDbServiceInstance();

    const result = db.updateCourse(id, courseId, courseName, departmentName, instituteName, universityName);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.listen(5000,()=>{
    console.log("Server is running on port number 5000")
})
