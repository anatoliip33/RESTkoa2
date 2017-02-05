"use strict";

module.exports = {
    newRow: (object) => {
        return '<tr><td>' + object.id + '</td><td>' + object.name +
            '</td><td>' +
            '<a class="delete" id='+object.id+' href="#delete">Удалить</a> | ' +
            '<a class="update" href="#update">Изменить</a>' +
            '</td>' +
            '</tr>';
    }
};