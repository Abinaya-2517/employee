document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#employeeTable tbody');

    fetch('http://localhost:3001/employees')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        renderTable(data);
    })
    .catch(error => {
        console.error('Error fetching employees:', error);
        // Display an error message to the user
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch employees. Please try again later.';
        tableBody.appendChild(errorMessage);
    });

    function renderTable(employees) {
        tableBody.innerHTML = '';
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.empId}</td>
                <td>${employee.department}</td>
                <td>${employee.gender}</td>
                <td>${employee.designation}</td>
                <td>${employee.salary}</td>
                <td>${employee.dob}</td>
                <td>${employee.address}</td>
                <td>${employee.fathername}</td>
                <td>${employee.mothername}</td>
                <td>${employee.aadharnum}</td>
                <td><button data-id="${employee.id}" class="delete-btn">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Attach event listener for delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const employeeId = this.dataset.id;
                deleteEmployee(employeeId);
            });
        });
    }

    function deleteEmployee(employeeId) {
        if (confirm('Are you sure you want to delete this employee?')) {
            fetch(`http://localhost:3001/deleteemployee/${employeeId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Employee deleted successfully!');
                // Refresh the table after deletion
                fetch('http://localhost:3001/employees')
                .then(response => response.json())
                .then(data => {
                    renderTable(data);
                })
                .catch(error => {
                    console.error('Error fetching employees:', error);
                });
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
                alert('Failed to delete employee. Please try again.');
            });
        }
    }
});

