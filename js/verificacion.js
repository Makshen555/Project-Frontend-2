async function verifyUser() {
  const token = sessionStorage.getItem('token');
  const _id = sessionStorage.getItem('id');

  try {
    const response = await fetch(`http://localhost:3000/api/users/${_id}/verify`, {
      method: 'PUT',
      headers: {
        'Authorization': token,
      },
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      viewUsers(); // Actualizar la lista de usuarios después de verificar
    } else {
      alert('Error al verificar el usuario');
    }
  } catch (err) {
    alert('Error al verificar el usuario');
  }
}

function getEmail() {
  const email = document.location.href;
  const split = email.split('?');
  const value = split[1]
  const label = document.getElementById("email")
  label.value = value;
}
getEmail();