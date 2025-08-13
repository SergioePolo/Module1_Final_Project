let buttonClicked = false;
document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    console.log("entre");

    const comment = document.getElementById('comment').value.trim();
    const user = getCurrentUser();
    
    if (comment && user?.userName) {
        document.querySelector('.card_comment_section').insertAdjacentHTML('beforeend', `
            <div class="comment">
                <div class="comment_title">
                    <div class="comment_buttons">
                        <div>
                            <img src="../assets/users/fotoDePerfil.webp" alt="Foto de perfil de ${user.userName}" class="avatar">
                            <p class="username">${user.userName}</p>
                        </div>
                        <div>
                            <button onclick="editComment(this)" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
                                <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/>
                                <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/>
                            </g>
                        </svg></button>
                            <button onclick="deleteComment(this)" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4"/>
                        </svg></button>
                        </div>
                    </div>
                </div>
                <div class="comment_body">
                    <p>${comment}</p>
                </div>
            </div>
        `);
        document.getElementById('comment').value = '';
    }
});

function editComment(button) {
    const commentText = button.closest('.comment').querySelector('.comment_body p');
    
    if (commentText.contentEditable === 'true') {
        commentText.contentEditable = false;
        commentText.style.border = 'none';
        commentText.style.backgroundColor = 'transparent';
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/></g></svg>`;
        button.title = 'Editar';
    } else {
        commentText.contentEditable = true;
        commentText.focus();
        commentText.style.border = '2px solid var(--accent_color_1)';
        commentText.style.backgroundColor = 'var(--text_font)';
        commentText.style.padding = '8px';
        commentText.style.borderRadius = '4px';
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 3h16M8 4v4"/><path d="M9.5 14.5L11 16l3-3"/></g></svg>`;
        button.title = 'Guardar';
    }
}

function deleteComment(button) {
    if (confirm('¿Eliminar este comentario?')) {
        button.closest('.comment').remove();
    }
}

function like(button){
    if(buttonClicked === false){
        buttonClicked = true;
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037.033l.034-.03a6 6 0 0 1 4.733-1.44l.246.036a6 6 0 0 1 3.364 10.008l-.18.185l-.048.041l-7.45 7.379a1 1 0 0 1-1.313.082l-.094-.082l-7.493-7.422A6 6 0 0 1 6.979 3.074"/></svg>`
    }
    else{
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1"
                                d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
                        </svg>`;
        buttonClicked = false;
    }
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}