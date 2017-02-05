"use strict";

const request = require('./request');
const template = require('./form');

module.exports = () => {

    request('http://localhost:3000/users', 'GET').then(response =>{
        let users = JSON.parse(response);
        for (let i in users) {
            if (users[i]) {
                let tmp = {
                    name: users[i].name,
                    id: Number(i) +1
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
        console.log(updButtons);
        for (let i=0; i<updButtons.length; i++) {
            delButtons[i].addEventListener('click', updateForm);
        }
    });

    function updateUser () {
        let id = this.parentNode.parentNode.parentNode.childNodes[1].textContent;
        let newName = this.parentNode.childNodes[0].childNodes[1].value;
        let body = JSON.stringify({name: newName})
        console.log(id);
        console.log(newName);
        request('http://localhost:3000/users/' + id, 'PUT', body).then((response) => {
            let user = {
                id : JSON.parse(response).id,
                name : newName
            };
        })
    }

    function deleteUser() {
        let id = this.getAttribute('id')-1;
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
            let row = template.newRow({name: body.name, id: user.id+1});
            document.getElementById('users_table').insertAdjacentHTML('beforeEnd', row);
            document.getElementById('name').value = "";
        });
    });
};