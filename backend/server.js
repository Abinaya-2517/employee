const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors=require('cors');

const app = express();
//const port = 3000;

const db = mysql.createConnection({
    host: 'bl91kqvm88huxxljjppp-mysql.services.clever-cloud.com',
    user: 'utawngl2illyeyaq',
    password: 'QwtwjoUDM7u0aOusiI8Q',
    database: 'bl91kqvm88huxxljjppp'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.use(cors());
app.use(bodyParser.json());

app.post('/addemployee', (req, res) => {
    const { name, empId,department,gender,designation, salary, dob, address, fatherName, motherName, aadharNum } = req.body;
    db.query('INSERT INTO employees (name, designation, salary, dob, address, fathername, mothername, aadharnum,empId,department,gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)', [name, designation, salary, dob, address, fatherName, motherName, aadharNum,empId,department,gender], (err, result) => {
        if (err) {
            console.error('Error adding employee:', err);
            res.status(500).json({ success: false, message: 'Failed to add employee' });
        } else {
            console.log('Employee added successfully');
            res.json({ success: true, message: 'Employee added successfully',...req.body });
        }
    });
});

app.listen(port, () => {
    console.log('Server is running on https://employee-5.onrender.com/ ');
});
