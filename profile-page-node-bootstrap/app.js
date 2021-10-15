const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();

app.use(bodyParser());

function htmlData(template,data){
    template = template.replace(/{%FNAME%}/g,data.fname);
    template = template.replace(/{%LNAME%}/g,data.lname);
    template = template.replace(/{%EMAIL%}/g,data.email);
    template = template.replace(/{%CONTACTNO%}/g,data.contactno);
    template = template.replace(/{%ADDRESS%}/g,data.address);
    template = template.replace(/{%GENDER%}/g,data.gender);
    template = template.replace(/{%BDATE%}/g,data.bdate);
    template = template.replace(/{%INSTITUTE%}/g,data.institute);
    template = template.replace(/{%DEPARTMENT%}/g,data.dept);
    template = template.replace(/{%SEMESTER%}/g,data.sem);

    return template;
}

app.get('/',(req,res) => {
    res.contentType('text/html');
    res.sendFile(__dirname+'/views/profile.html');
});

app.post('/view',(req,res)=>{
    
    if (req.body.fname.length == 0) {
        req.body.fname = "<script>alert('First Name Is Required');</script>";
    }else if (req.body.fname.length > 10) {
        req.body.fname = "<script>alert('First Name Length Is More Then 10');</script>";
    }else {
        req.body.fname = `<span>${req.body.fname}</span>`;
    }

    if (req.body.lname.length == 0) {
        req.body.lname = "<script>alert('Last Name Is Required');</script>";
    }else if (req.body.lname.length > 10) {
        req.body.lname = "<script>alert('Last Name Length Is More Then 10');</script>";
    }else {
        req.body.lname = `<span>${req.body.lname}</span>`;
    }
    
    if (req.body.contactno.length == 0) {
        req.body.contactno = "<script>alert('Mobile No. Is Required');</script>";
    }else if (req.body.contactno.length < 10) {
        req.body.contactno = "<script>alert('Mobile No. Is Less Then 10 Numbers');</script>";
    }else {
        req.body.contactno = `<span>${req.body.contactno}</span>`;
    }
    
    let today = new Date();
    let bdate = new Date(req.body.bdate);
    
    if (req.body.bdate === "") {
        req.body.bdate = "<script>alert('Date Of Birth Is Required');</script>";
    }else if (today.getTime() < bdate.getTime()) {
        req.body.bdate = "<script>alert('Future Date');</script>";
    }else {
        req.body.bdate = `<span>${req.body.bdate}</span>`;
    }
    
    if (req.body.gender === "male" || req.body.gender === "female") {
        req.body.gender = `<span>${req.body.gender}</span>`;
    }else {
        req.body.gender = `<script>alert('Gender Is Required');</script>`;
    }
    
    if (req.body.address === "") {
        req.body.address = "<script>alert('Address Is Required');</script>";
    }else {
        req.body.address = `<span>${req.body.address}</span>`;
    }
    
    req.body.institute = `<span>${req.body.institute}</span>`;
    req.body.dept = `<span>${req.body.dept}</span>`;
    req.body.sem = `<span>${req.body.sem}</span>`;

    let viewData = fs.readFileSync(__dirname+"/views/view.html","utf-8");
    let viewDataHtml = htmlData(viewData,req.body);
    res.contentType('text/html');
    res.send(viewDataHtml);
})

app.listen(5000,()=>console.log(`Server running on port 5000.`));