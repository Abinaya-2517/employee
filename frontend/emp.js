function nextPage() {
    const name = document.getElementById('name').value;
    const empId = document.getElementById('empId').value;
    const department = document.getElementById('department').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const designation = document.getElementById('designation').value;
    const salary = document.getElementById('salary').value;
    const dob = document.getElementById('dob').value;

    localStorage.setItem('name', name);
    localStorage.setItem('empId', empId);
    localStorage.setItem('department', department);
    localStorage.setItem('gender', gender);
    localStorage.setItem('designation', designation);
    localStorage.setItem('salary', salary);
    localStorage.setItem('dob', dob);

    window.location.href = 'emppage2.html';
}

function submitForm() {
    const name = localStorage.getItem('name');
    const empId = localStorage.getItem('empId');
    const department = localStorage.getItem('department');
    const gender = localStorage.getItem('gender');
    const designation = localStorage.getItem('designation');
    const salary = localStorage.getItem('salary');
    const dob = localStorage.getItem('dob');
    const address = document.getElementById('address').value;
    const fatherName = document.getElementById('fatherName').value;
    const motherName = document.getElementById('motherName').value;
    const aadharNum = document.getElementById('aadharNum').value;

    const formData = {
        name: name,
        empId: empId,
        department: department,
        gender: gender,
        designation: designation,
        salary: salary,
        dob: dob,
        address: address,
        fatherName: fatherName,
        motherName: motherName,
        aadharNum: aadharNum
    };

    fetch('https://employee-management-system-nq7d.onrender.com/addemployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        const flashCardHTML = `
            
                
                Name:${data.name}
                Employee ID:${data.empId}
                Department: ${data.department}
                Gender: ${data.gender}
                Designation: ${data.designation}
                Salary: ${data.salary}
                Date of Birth:${data.dob}
                Address: ${data.address}
                Father's Name: ${data.fatherName}
                Mother's Name:${data.motherName}
                Aadhar Number:${data.aadharNum}
            
        `;

        // Redirect to admin page after displaying flash card
        
        alert(flashCardHTML);
        localStorage.clear();
        window.location.href = 'emppage1.html';

    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again.');
    });
}
