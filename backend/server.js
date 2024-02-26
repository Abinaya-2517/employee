const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors=require('cors');

const app = express();
//const port = 3000;

const db = mysql.createConnection({
    host: 'bqdva2aphs7lnuynsylj-mysql.services.clever-cloud.com',
    user: 'uwbq2u6oisnwy5xj',
    password: 'uM11dRGoxAnpQxTqHDzC',
    database: 'bqdva2aphs7lnuynsylj'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.use(cors());
app.use(bodyParser.json());

app.get('/favicon.ico', (req, res) => res.status(204));

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
app.post('/admin',(req,res)=>{
   
    const { emailid, password } = req.body;
      db.query('SELECT * FROM admin WHERE email = ? AND password = ?',
    [emailid,password],(err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(600).send('Error occurred while creating account');
        } 
        
        else{
            console.log("Account created successfully");
            res.status(300).json({ message: 'Account created successfully' });
        }
    });
  });
// Get all employees route


app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching employees:', err);
            res.status(500).json({ success: false, message: 'Failed to fetch employees' });
        } else {
            res.json(result);
        }
    });
});

app.delete('/deleteemployee/:id', (req, res) => {
    const employeeId = req.params.id;
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.query(sql, [employeeId], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            res.status(500).json({ success: false, message: 'Failed to delete employee' });
        } else {
            res.json({ success: true, message: 'Employee deleted successfully' });
        }
    });
});

app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});
