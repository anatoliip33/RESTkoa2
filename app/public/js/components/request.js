"use strict";

module.exports = (url, method, body) => {

    return new Promise(function (resolve, reject) {

        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onload = function () {
            if (this.status == 200 || this.status == 201 || this.status == 204) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        };

        xhr.onerror = () => reject(this.statusText);


        if (body) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }

    });
};
    
