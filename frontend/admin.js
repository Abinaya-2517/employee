document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup form');
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      const emailid= document.getElementById('emailid').value;
      const password = document.getElementById('password').value;
      fetch('https://emloyee-manangement-system.onrender.com/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({emailid: emailid, password: password })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.href = 'empdetails.html'; 
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });