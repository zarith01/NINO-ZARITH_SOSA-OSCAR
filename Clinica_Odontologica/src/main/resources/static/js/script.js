Script.js

const API_BASE_URL = 'http://localhost:63342/api';

async function fetchOdontologos() {
    const response = await fetch(`${API_BASE_URL}/odontologos`);
    return response.json();
}

async function addOdontologo(odontologo) {
    const response = await fetch(`${API_BASE_URL}/odontologos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(odontologo)
    });
    return response.json();
}


