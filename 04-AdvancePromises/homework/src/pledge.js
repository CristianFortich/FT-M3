'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){
    if(typeof(executor)!=='function') throw new TypeError('executor is not a function');
    this._state = 'pending';
    this._value;
    this._handlerGroups =[];
    executor(this._internalResolve.bind(this),this._internalReject.bind(this));
}

$Promise.prototype.then = function(success, error){
    if(typeof success!='function') success = false;
    if(typeof error!='function') error = false;
    this._handlerGroups.push({successCb: success,errorCb: error});
    if(this._state != 'pending') this._callHandlers();
}

$Promise.prototype._internalResolve = function(data){
    if(this._state === 'pending'){
        this._value = data;
        this._state = 'fulfilled';
        this._callHandlers();
    }
}

$Promise.prototype._internalReject = function(data){
    if(this._state === 'pending') {
        this._value = data;
        this._state = 'rejected'
        this._callHandlers();
    }
}

$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length>0){
        let current = this._handlerGroups.shift();
        if(this._state == 'fulfilled'){
            current.successCb && current.successCb(this._value);
        }else if(this._state == 'rejected'){
            current.errorCb && current.errorCb(this._value);
        }
    }
}

$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb);
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
