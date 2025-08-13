// Modal Functions for Signup
function mostrarErrorExistente() {
    document.getElementById('modalError').style.display = 'flex';
}

function mostrarExito(userName) {
    const modal = document.getElementById('modalSuccess');
    const mensaje = document.getElementById('modalMensajeSuccess');
    mensaje.textContent = `¡Hola ${userName}! Usuario creado con éxito, bienvenido`;
    modal.style.display = 'flex';
}

function mostrarErrorGuardar() {
    document.getElementById('modalSaveError').style.display = 'flex';
}

function cerrarModalError() {
    document.getElementById('modalError').style.display = 'none';
}

function cerrarModalSuccess() {
    document.getElementById('modalSuccess').style.display = 'none';
    window.location.href = '../index.html';
}

function cerrarModalSaveError() {
    document.getElementById('modalSaveError').style.display = 'none';
}

// Temporary modals (auto-close)
function mostrarErrorTemporal(segundos = 3) {
    mostrarErrorExistente();
    setTimeout(() => {
        cerrarModalError();
    }, segundos * 1000);
}

function mostrarExitoTemporal(userName, segundos = 3) {
    mostrarExito(userName);
    setTimeout(() => {
        cerrarModalSuccess();
    }, segundos * 1000);
}

function createUser(userData) {
    let users = getUsers();
    userData.id = Date.now();
    userData.createdAt = new Date().toISOString();
    users.unshift(userData);
    localStorage.setItem('usersCreated', JSON.stringify(users));
    return userData;
}

function getUsers() {
    const store = localStorage.getItem('usersCreated');
    return store ? JSON.parse(store) : [];
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !userName || !password) {
        alert('Por favor, llena todos los campos');
        return;
    }

    const users = getUsers();
    const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (userExists) {
        mostrarErrorTemporal(4);
        document.getElementById('signupForm').reset();
        return;
    }

    const user = {
        email: email,
        userName: userName,
        password: password
    };

    try {
        createUser(user);
        mostrarExitoTemporal(userName, 3);
        document.getElementById('signupForm').reset();
    } catch (error) {
        console.error('Error saving user:', error);
        mostrarErrorGuardar();
    }
});