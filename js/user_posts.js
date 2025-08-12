document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const comment = document.getElementById('comment').value.trim();
    const user = getCurrentUser();
    
    if (comment && user?.userName) {
        document.querySelector('.card_comment_section').insertAdjacentHTML('beforeend', `
            <div class="comment">
                <div class="comment_title">
                    <img src="../assets/users/fotoDePerfil.webp" alt="Foto de perfil de ${user.userName}" class="avatar">
                    <p class="username">${user.userName}</p>
                </div>
                <div class="comment_body">
                    <p>${comment}</p>
                </div>
            </div>
        `);
        
        document.getElementById('comment').value = '';
    }
});

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}