var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.gather = function(creep) {
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

module.exports = role;
