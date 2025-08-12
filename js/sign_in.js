// Modal Functions - adapted to work with your HTML structure
function mostrarError(mensaje) {
    const modal = document.getElementById('modalError');
    const mensajeElement = document.getElementById('modalMensaje');
    
    mensajeElement.textContent = mensaje;
    modal.style.display = 'flex';
}

function mostrarExito(mensaje) {
    const modal = document.getElementById('modalSuccess');
    const mensajeElement = document.getElementById('modalMensajeSuccess');
    
    mensajeElement.textContent = mensaje;
    modal.style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalError').style.display = 'none';
}

function cerrarModalSuccess() {
    document.getElementById('modalSuccess').style.display = 'none';
    window.location.href = '../pages/main.html';
}

function mostrarErrorTemporal(mensaje, segundos = 2) {
    mostrarError(mensaje);
    
    setTimeout(() => {
        cerrarModal();
    }, segundos * 1000);
}

function mostrarExitoTemporal(mensaje, segundos = 3) {
    mostrarExito(mensaje);
    
    setTimeout(() => {
        cerrarModalSuccess();
    }, segundos * 1000);
}

function getUsers() {
    const store = localStorage.getItem("usersCreated");
    return store ? JSON.parse(store) : [];
}

document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (!email || !password) {
        mostrarErrorTemporal('Tramposillo, llena todos los datos', 3);
        return;
    }
    
    const users = getUsers();
    const user = users.find(
        (user) => user.email === email && user.password === password
    );
    
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        const userName = user.userName || user.email.split('@')[0];
        mostrarExitoTemporal(`¡Hola ${userName}! Bienvenido a MatchFood`, 2);
        
    } else {
        mostrarErrorTemporal('Uy, parece que no te encontramos, intenta de nuevo', 3);
        document.getElementById("signinForm").reset();
    }
});