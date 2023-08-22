async function createEdit() {
    const input = document.getElementById('input').value;
    const instruction = document.getElementById('instruction').value;
    const user = sessionStorage.getItem("id");

    const response = await fetch('http://localhost:3000/api/editPrompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input, instruction, user }),
    })
    const data = await response.json();
    if (response.ok) {
        alert('Edit registrado exitosoamente.');
        window.location.href = "user.html"
    } else {
        alert(data.message);
    }
}
async function createCompletion() {
    const prompt = document.getElementById('prompt').value;
    const user = sessionStorage.getItem("id");

    const response = await fetch('http://localhost:3000/api/completionPrompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, user }),
    })
    const data = await response.json();
    if (response.ok) {
        alert('Completion registrado exitosamente.');
        window.location.href = "user.html"
    } else {
        alert(data.message);
    }
}

async function createImage() {
    const prompt = document.getElementById('prompt').value;
    const size = document.getElementById('size').value
    const user = sessionStorage.getItem("id");

    const response = await fetch('http://localhost:3000/api/imagePrompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt,size, user }),
    })
    const data = await response.json();
    if (response.ok) {
        alert('Completion registrado exitosamente.');
        window.location.href = "user.html"
    } else {
        alert(data.message);
    }
}