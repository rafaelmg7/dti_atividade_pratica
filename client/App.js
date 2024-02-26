class Lembrete{
    constructor(nome, data){
        this.nome = nome;
        this.data = data;
    }

    getNome(){
        return this.nome;
    }

    getData(){
        return this.data;
    }

    criarLembrete(){
        this.nome = document.getElementById('nome').value;
        this.data = document.getElementById('data').value;
    }
}

const form = document.getElementById('reminder-form');
const reminderList = document.getElementById('reminder-list');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;

    const reminderItem = document.createElement('li');
    reminderItem.textContent = `Name: ${name}, Date: ${date}`;

    reminderList.appendChild(reminderItem);

    form.reset();
});
