var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var roleNewUpgrader = Object.assign({}, roleBaseWorker); 

roleNewUpgrader.work = function(creep) {
    
    var cont = funcs.myRoom.controller;
    
    if(creep.upgradeController(cont) == ERR_NOT_IN_RANGE) {
        creep.moveTo(cont);
    }

}

roleNewUpgrader.body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],

module.exports = roleNewUpgrader;
