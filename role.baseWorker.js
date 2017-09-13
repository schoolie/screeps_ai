var funcs = require('funcs');
var baseCreep = require('role.baseCreep');

var roleBaseWorker = Object.assign({}, baseCreep); 

roleBaseWorker.body = [CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE],

roleBaseWorker.run = function(creep) {
        
    if(creep.memory.transporting && creep.carry.energy == 0) {
        creep.memory.transporting = false;
        // funcs.StoreSource(creep);
        creep.say('🔄 harvest');
    }
    
    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
        creep.memory.transporting = true;
        creep.say('🚧 transport');
    }


    if(!creep.memory.transporting) {
        funcs.GetEnergy(creep);
    }
    
    
    else {
        this.work(creep);
    }
}

module.exports = roleBaseWorker;
