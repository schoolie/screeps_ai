var funcs = require('funcs');
var baseCreep = require('role.baseCreep');

var roleBaseWorker = Object.assign({}, baseCreep); 

roleBaseWorker.run = function(creep) {
        
    if(creep.memory.transporting && _.sum(creep.carry) == 0) {
        creep.memory.transporting = false;
        // funcs.StoreSource(creep);
        creep.say('collect');
    }
    
    if(!creep.memory.transporting && _.sum(creep.carry) == creep.carryCapacity) {
        creep.memory.transporting = true;
        creep.say(this.name);
    }

    if(!creep.memory.transporting) {
        this.gather(creep);}
    
    else {
        this.work(creep);
    }
}

module.exports = roleBaseWorker;
