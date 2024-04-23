// cria as funçoes de adicionar e remover o modal 
function modalOpen() {
    document.getElementById('modal').classList.add('active')
}

function modalClose() {
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('userRegistration').addEventListener('click', modalOpen);
document.getElementById('modalClose').addEventListener('click', modalClose);


