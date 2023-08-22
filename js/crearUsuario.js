//Funcion para el crear usuarios
async function crearUsuario() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:3000/api/users?role=administrador', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
        alert('Usuario creado exitosamente.');
        window.location.href = "admin.html"
    } else {
        alert(data.message);
    }
  }