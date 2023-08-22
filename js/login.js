//Funcion para loguearse por medio del username y el password
async function login() {
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('id', data._id)

      if (data.role === 'administrador') {
        // Si el usuario es administrador, redirigir a admin.html
        window.location.href = 'admin.html';
      } else if (data.role === 'usuario' && !data.verified) {
        // Si el usuario es usuario y no está verificado, redirigir a una página de espera
        alert('Deber esperar hasta que su cuenta sea verificada por un Administrador');
      } else {
        // Si el usuario es usuario verificado, redirigir a otra página, por ejemplo, user.html
        window.location.href = 'user.html';
      }
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Error al iniciar sesión');
  }
}