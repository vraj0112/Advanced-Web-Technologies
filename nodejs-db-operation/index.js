const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'university'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});

const app = express();

app.use(bodyParser());

app.set("view engine", "hbs")

app.engine("hbs", hbs({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "home",
    partialsDir: `${__dirname}/views/partials`
}))

app.get("/", (req, res) => {
    res.render("main");
})

app.post("/insert", (req, res) => {

    const dbInsert = `INSERT INTO course
    (subjectcode, subjectname, institutename, departmentname, semester)
    VALUES ('${req.body.subjectcode}', '${req.body.subjectname}', '${req.body.institutename}', '${req.body.departmentname}', '${req.body.semester}')`;

    connection.query(dbInsert, (err, result) => {
        if (err) {
            res.render("inserterror");
        }
        else {
            res.render("insert", {
                subject: {
                    subjectCode: req.body.subjectcode,
                    subjectName: req.body.subjectname,
                    instituteName: req.body.institutename,
                    departmentName: req.body.departmentname,
                    semester: req.body.semester
                }
            });
        }
    });



})

app.get("/show", (req, res) => {

    let getAllCourses = "SELECT * FROM course";
    connection.query(getAllCourses, (err, result) => {
        if (err) {
            res.render("showerror");
        }
        else {
            console.log(result);
            res.render("show", {
                subjects: result
            });
        }
    });
})


app.listen(3000, () => { console.log("Server is listening on port 3000"); });