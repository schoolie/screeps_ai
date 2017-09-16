var funcs = require('funcs');
var baseCreep = require('role.baseCreep');

var roleBaseWorker = Object.assign({}, baseCreep); 

roleBaseWorker.run = function(creep) {
        
    if(creep.memory.transporting && creep.carry.energy == 0) {
        creep.memory.transporting = false;
        // funcs.StoreSource(creep);
        creep.say('harvest');
    }
    
    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
        creep.memory.transporting = true;
        creep.say('transport');
    }

    if(!creep.memory.transporting) {
        if (!creep.memory.sourceId) {
            var sources = creep.room.find(FIND_SOURCES);
            var source = sources[Memory.nextSourceId];
            Memory.nextSourceId = ((Memory.nextSourceId == 1) ? 0 : 1);

            creep.memory.sourceId = source.id;
        }
       
        var source = Game.getObjectById(creep.memory.sourceId);;
        
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }

    }
    
    else {
        this.work(creep);
    }
}

module.exports = roleBaseWorker;
