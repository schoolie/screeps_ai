var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.work = function(creep) {
    
    var cont = funcs.myRoom.controller;
    
    if(creep.upgradeController(cont) == ERR_NOT_IN_RANGE) {
        creep.moveTo(cont);
    }

}

role.name = 'upgrader';

module.exports = role;
