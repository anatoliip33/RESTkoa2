"use strict";

module.exports = {
    newRow: (object) => {
        let number = object.id+1;
        return '<tr><td>' + number + '</td><td>' + object.name +
            '</td><td>' +
            '<a class="delete" id='+object.id+' href="#delete">Удалить</a> | ' +
            '<a class="update" href="#update">Изменить</a>' +
            '</td>' +
            '</tr>';
    }
};