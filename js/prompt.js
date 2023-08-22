async function viewEdits() {
    const token = sessionStorage.getItem('token');
    const userID = sessionStorage.getItem('id');

    try {
        const response = await fetch('http://localhost:3000/api/editPrompt', {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        });

        const data = await response.json();
        if (response.ok) {
            const editsContainer = document.getElementById('edits-container');
            editsContainer.innerHTML = '';

            // Crear una tabla para mostrar los Edits
            const table = document.createElement('table');
            table.innerHTML = `
          <tr>
            <th>Input</th>
            <th>Description</th>
            <th>Acciones</th>
          </tr>
        `;
            editsContainer.appendChild(table);

            // Agregar filas de edits a la tabla
            data.forEach(edit => {
                const row = document.createElement('tr');
                if (edit.user === userID) {
                    row.innerHTML = `
                    <td>${edit.input}</td>
                    <td>${edit.instruction}</td>
                    <td>
                      <button onclick="deleteEdit('${edit._id}')">Eliminar</button>
                    </td>`;
                    table.appendChild(row);
                }
            });
        }
    } catch (err) {
        alert('Error al obtener la lista de usuarios');
    }
}
function goCreateEdit() {
    window.location.href = "createEdit.html";
}
function goCreateCompletion() {
    window.location.href = "createCompletion.html";
}
function goCreateImage() {
    window.location.href = "createImage.html";
}
async function viewCompletions() {
    const token = sessionStorage.getItem('token');
    const userID = sessionStorage.getItem('id');

    try {
        const response = await fetch('http://localhost:3000/api/completionPrompt', {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        });

        const data = await response.json();
        if (response.ok) {
            const completionContainer = document.getElementById('completion-container');
            completionContainer.innerHTML = '';

            // Crear una tabla para mostrar los Edits
            const table = document.createElement('table');
            table.innerHTML = `
          <tr>
            <th>Instruccion</th>
            <th>Acciones</th>
          </tr>
        `;
            completionContainer.appendChild(table);

            // Agregar filas de edits a la tabla
            data.forEach(completion => {
                const row = document.createElement('tr');
                if (completion.user === userID) {
                    row.innerHTML = `
            <td>${completion.prompt}</td>
            <td>
              <button onclick="deleteCompletion('${completion._id}')">Eliminar</button>
            </td>`;
                    table.appendChild(row);
                }

            });
        }
    } catch (err) {
        alert('Error al obtener la lista de usuarios');
    }
}
async function viewImages() {
    const token = sessionStorage.getItem('token');
    const userID = sessionStorage.getItem('id');

    try {
        const response = await fetch('http://localhost:3000/api/imagePrompt', {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        });

        const data = await response.json();
        if (response.ok) {
            const imageContainer = document.getElementById('image-container');
            imageContainer.innerHTML = '';

            // Crear una tabla para mostrar los Edits
            const table = document.createElement('table');
            table.innerHTML = `
          <tr>
            <th>Instruccion</th>
            <th>Acciones</th>
          </tr>
        `;
            imageContainer.appendChild(table);

            // Agregar filas de edits a la tabla
            data.forEach(image => {
                const row = document.createElement('tr');
                if (image.user === userID) {
                    row.innerHTML = `
                    <td>${image.prompt}</td>
                    <td>
                      <button onclick="deleteImage('${image._id}')">Eliminar</button>
                    </td>`;
                    table.appendChild(row);
                }
            });
        }
    } catch (err) {
        alert('Error al obtener la lista de images');
    }
}

async function deleteEdit(editID) {
    const shouldDelete = confirm('¿Estás seguro de que deseas eliminar este Edit?');
    if (!shouldDelete) {
        return; // El usuario canceló la eliminación
    }

    const token = sessionStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/api/editPrompt/${editID}`, {
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
            alert('Error al eliminar el edit');
        }
    } catch (err) {
        alert('Error al eliminar el edit');
    }
}
async function deleteCompletion(completionID) {
    const shouldDelete = confirm('¿Estás seguro de que deseas eliminar este Completion?');
    if (!shouldDelete) {
        return; // El usuario canceló la eliminación
    }

    const token = sessionStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/api/completionPrompt/${completionID}`, {
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
            alert('Error al eliminar el completion');
        }
    } catch (err) {
        alert('Error al eliminar el completion');
    }
}
async function deleteImage(imageID) {
    const shouldDelete = confirm('¿Estás seguro de que deseas eliminar este image?');
    if (!shouldDelete) {
        return; // El usuario canceló la eliminación
    }

    const token = sessionStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/api/imagePrompt/${imageID}`, {
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
            alert('Error al eliminar el image');
        }
    } catch (err) {
        alert('Error al eliminar el image');
    }
}
function logOut() {
    localStorage.removeItem('token', 'id');
    sessionStorage.removeItem('token', 'id');
    window.location.href = 'login.html';
}
viewEdits()
viewCompletions()
viewImages()
