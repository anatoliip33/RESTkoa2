"use strict";

const request = require('./request');
const template = require('./form');

module.exports = () => {

    request('http://localhost:3000/users', 'GET').then(response =>{
        let users = JSON.parse(response);
        for (let i=0; i < users.length; i++) {
            console.log(i);
            if (users[i]) {
                let tmp = {
                    name: users[i].name,
                    id: Number(i)
                };
                document.getElementById('users_table').insertAdjacentHTML('beforeEnd', template.newRow(tmp));
            }
        }
    }).then(()=>{
        let delButtons = document.getElementsByClassName('delete');

        for (let i=0; i<delButtons.length; i++) {
            delButtons[i].addEventListener('click', deleteUser);
        }
        let updButtons = document.getElementsByClassName('update');

        for (let i=0; i<updButtons.length; i++) {
            updButtons[i].addEventListener('click', addForm);
        }
    });

    function addForm(){
        let updateForm = '<td>'+
            '<form action="" class="form-inline">'+
            '<div class="form-group">'+
            '<label for="updateName" class="sr-only">Имя</label>' +
            '<input class="form-control" type="text" value="">' +
            '</div>'+
            '&nbsp;'+
            '<button type="submit" class="updateName" class="btn btn-primary">Изменить</button>' +
            '</form>'+
            '</td>';
        this.parentNode.parentNode.insertAdjacentHTML('beforeEnd', updateForm);
        this.parentNode.remove();

        (function(){
            let updateName = document.getElementsByClassName('updateName');
            for (let i=0; i<updateName.length; i++) {
                updateName[i].addEventListener('click', updateUser);
            }
        })()
    }

    function updateUser () {
        let id = this.parentNode.parentNode.parentNode.childNodes[0].innerText;
        let newName = this.parentNode.childNodes[0].childNodes[1].value;
        let body = {name: newName};
        request('http://localhost:3000/users/' + id, 'PUT', body).then((response) => {
            let user = JSON.parse(response);
        })
    }

    function deleteUser() {
        let id = this.getAttribute('id');
        request('http://localhost:3000/users/' + id, 'DELETE').then(response =>{
            this.parentNode.parentNode.remove();
        });
    }

    document.getElementById('form_create').addEventListener('submit', event => {
        event.preventDefault();
        let userName = document.getElementById('name').value;
        if (!userName) {
            throw new Error('Please enter user name');
        }
        let body = {'name': userName};
        request('http://localhost:3000/users', 'POST', body).then(response => {
            let user = JSON.parse(response);
            let row = template.newRow({name: body.name, id: user.id});
            document.getElementById('users_table').insertAdjacentHTML('beforeEnd', row);
            document.getElementById('name').value = "";
        });
    });
};