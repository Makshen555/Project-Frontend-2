//Funcion para hacer un get de todos los usuarios con el rol de usuario y guardarlos en una tabla.
async function viewUsers() {
  const token = sessionStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });

    const data = await response.json();
    if (response.ok) {
      const usersContainer = document.getElementById('users-container');
      usersContainer.innerHTML = '';

      // Crear una tabla para mostrar los usuarios
      const table = document.createElement('table');

      table.innerHTML = `
        <tr>
          <th>Email</th>
          <th>Nombre completo</th>
          <th>Acciones</th>
        </tr>
      `;
      usersContainer.appendChild(table);

      // Agregar filas de usuarios a la tabla
      data.forEach(user => {
        const row = document.createElement('tr');
        if (user.verified === true) {
          row.innerHTML = `
          <td>${user.email}</td>
          <td>${user.name}</td>
          <td>
            <button onclick="cargarUser('${user._id}')">Editar</button>
            <button onclick="deleteUser('${user._id}')">Eliminar</button>
          </td>
        `;
        table.appendChild(row);
        } else {
          row.innerHTML = `
          <td>${user.email}</td>
          <td>${user.name}</td>
          <td>
            <button onclick="verifyUser('${user._id}')">Verificar</button>
            <button onclick="cargarUser('${user._id}')">Editar</button>
            <button onclick="deleteUser('${user._id}')">Eliminar</button>
          </td>
        `;
        table.appendChild(row);
        }
      });

    } else {
      alert('Error al obtener la lista de usuarios');
    }
  } catch (err) {
    alert('Error al obtener la lista de usuarios');
  }
}
//Funcion para verificar usuarios
async function verifyUser(userId) {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}/verify`, {
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
//Funcion para editar los usuarios
async function cargarUser(userId) {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:3000/api/users?id=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });

    const data = await response.json();
    if (response.ok) {
      const editDiv = document.getElementById('editDiv');
      editDiv.style = 'display:content';

      const newEmail = document.getElementById("newEmail");
      newEmail.value = data.email;

      const newName = document.getElementById("newName");
      newName.value = data.name;

      const curentID = document.getElementById("curentID");
      curentID.value = data._id;

    } else {
      alert('Error al obtener la lista de usuarios');
    }
  } catch (err) {
    alert('Error al obtener la lista de usuarios');
  }
}
async function updateUser() {
  const token = sessionStorage.getItem('token');
  const newEmail = document.getElementById('newEmail')
  const newName = document.getElementById("newName");
  const userId = document.getElementById("curentID");
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId.value}`, {
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail.value, name: newName.value }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      viewUsers();
    } else {
      alert('Error al actualizar el usuario');
    }
  } catch (err) {
    alert('Error al actualizar el usuario');
  }
}
//Funcion para eliminar los usuarios
async function deleteUser(userId) {
  const shouldDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
  if (!shouldDelete) {
    return; // El usuario canceló la eliminación
  }

  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      },
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      // Recargar la página para actualizar la lista de usuarios
      location.reload();
    } else {
      alert('Error al eliminar el usuario');
    }
  } catch (err) {
    alert('Error al eliminar el usuario');
  }
}
function logOut() {
  localStorage.removeItem('token', 'id');
  sessionStorage.removeItem('token', 'id');
  window.location.href = 'login.html';
}
function goCreateUser() {
  window.location.href = 'crearUsuario.html';
}
viewUsers();