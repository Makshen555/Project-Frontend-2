//Funcion para el registro de usuarios
async function register() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    if (repeatPassword === password) {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = "login.html"
        } else {
            alert(data.message);
        }
    } else {
        alert('Las contrasennas no son iguales');
    }

}