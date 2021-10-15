const mysql = require('mysql');
const dotwnv = require('dotenv');
let instance = null;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'course'
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
});

class DBService{
    static getDbServiceInstance() {
        return instance ? instance : new DBService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM courseinfo;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewCourse(courseId, courseName, departmentName, instituteName, universityName) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO courseinfo (courseId, courseName, departmentName, instituteName, universityName, dateAdded) VALUES (?,?,?,?,?,?);";
                connection.query(query, [courseId, courseName, departmentName, instituteName, universityName, dateAdded] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                courseId : courseId,
                courseName: courseName,
                departmentName: departmentName,
                instituteName: instituteName,
                universityName: universityName,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); //base decimal 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM courseinfo WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateCourse(id, courseId, courseName, departmentName, instituteName, universityName) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE courseinfo SET courseId = ?, courseName = ?, departmentName = ?, instituteName = ?, universityName = ?  WHERE id = ?";
                connection.query(query, [courseId, courseName, departmentName, instituteName, universityName, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DBService;