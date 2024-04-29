document.addEventListener('DOMContentLoaded',(event) =>{
    event.preventDefault();

    // const form = document.querySelector('modalForm')
    // form.addEventListener('submit', loadUserData)    
    loadUserDataList();
})



// cria as funçoes de adicionar e remover o modal 
function modalOpen() {
    document.getElementById('modal').classList.add('active')
}

function modalClose() {
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('userRegistration').addEventListener('click', () => {
    const edit = document.getElementById('modalHeader')
    edit.innerHTML = `<h2>Novo Usuário</h2>`
    modalOpen();
});
document.getElementById('modalClose').addEventListener('click', modalClose);

// função para pegar os dados do modal e enviar na tabela
function loadUserData(){
    let listUser = []
    // event.preventDefault();
    
    const userData = {
        id:(Math.random()*100).toFixed(),
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        celular:document.getElementById('cel').value,
        cidade:document.getElementById('city').value
    }

    if(localStorage.getItem('users')){
        listUser = JSON.parse(localStorage.getItem('users'))
    }

    listUser.push(userData)
    localStorage.setItem('users', JSON.stringify(listUser))

    console.log(listUser);

    window.location.reload();


}



const loadUserDataList = ()=>{
    let listUsers = [];
    const tableData = document.getElementById('tableBodyList');

    if(localStorage.getItem('users')){
        listUsers = JSON.parse(localStorage.getItem('users')); //json -> objeto
        
        let template = '';
        listUsers.forEach(user => {
            template += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.celular}</td>
                <td>${user.cidade}</td>
                <td>
                <button type="button" class="button green" onclick="edit(${user.id})">Editar</button>
                <button type="button" class="button red" onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            </tr>
            `
            tableData.innerHTML = template;
        });      
    }  
    
    if (listUsers.length == 0) {   
        tableData.innerHTML = 
        `
        <tr>
            <td colspan='5'>Nenhum usuário cadastrado!</td>
        </tr>
        `
        // tableData.innerHTML = template;
    }

}

function deleteUser(id) {
    const getUserData = JSON.parse(localStorage.getItem("users"))
    
    const findUser = getUserData.find((user) => user.id == id);
    
    if (findUser !== -1) {
        getUserData.splice(findUser, 1)
        localStorage.setItem("users",JSON.stringify(getUserData))
        window.location.reload();
    }
}


function edit(id) {
    const edit = document.getElementById('modalHeader')
    edit.innerHTML = ` <h2>Editar Usuário</h2>  `
    document.getElementById('saveValues').innerText = 'Atualizar'; //muda o texto do botao
    modalOpen();

    const getUserData = JSON.parse(localStorage.getItem("users"));
    const userData = getUserData.find((identificarUsuario) => identificarUsuario.id == id);
    

    document.getElementById("name").value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('cel').value = userData.celular;
    document.getElementById('city').value = userData.cidade;

    document.getElementById('saveValues').addEventListener('click', ()=>{updateUserInfo(id)});


}
function updateUserInfo(id) {
        const newName = document.getElementById('name').value;
        const newEmail = document.getElementById('email').value;
        const newCel = document.getElementById('cel').value;
        const newCity = document.getElementById('city').value;
    
        const userList = JSON.parse(localStorage.getItem("users")) || []
    
        const userIndexFind = userList.findIndex((user) => user.id == id)
    
        if (userIndexFind !== -1) {
            userList[userIndexFind].name = newName;
            userList[userIndexFind].email = newEmail;
            userList[userIndexFind].phone = newCel;
            userList[userIndexFind].city = newCity;
    
            console.log(userList);
    
            localStorage.setItem("users", JSON.stringify(userList));
        }
    }
    
