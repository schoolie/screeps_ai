var roleBaseWorker = require('role.energyWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.work = function(creep) {
    
    var cont = creep.room.controller;
    
    if(creep.upgradeController(cont) == ERR_NOT_IN_RANGE) {
        creep.moveTo(cont);
    }

}

role.name = 'upgrader';

module.exports = role;
