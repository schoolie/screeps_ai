var funcs = require('funcs');
var baseRole = require('role.baseWorker');

var role = Object.assign({}, baseRole); 

role.gather = function(creep) {
    if (!creep.memory.sourceId) {
        var sources = creep.room.find(FIND_MINERALS);
        var source = sources[0];

        creep.memory.sourceId = source.id;
    }
                          
    var source = Game.getObjectById(creep.memory.sourceId);;
                                       
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
}

role.work = function(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE)
        }
    });

    if (targets.length > 0) {
        var transferType = false;

        carries = Object.keys(creep.carry);
        for (c in carries) {
            carryType = carries[c];
            if (carryType != 'energy') {
                transferType = carryType;
            }
        }
       
        console.log(transferType);

        if (transferType) {
            if(creep.transfer(targets[0], transferType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    }
}

role.shouldSpawn = function(room) {
    var countOK = this.count(room) < this.max
    var canMine = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTRACTOR)
        }
    }).length > 0;
    
    return countOK && canMine;
}

role.name = 'miner';

role.bodies = [
    [CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE],
    [CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE],
    [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE],
    [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE],
    [CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE],
]

module.exports = role;;
