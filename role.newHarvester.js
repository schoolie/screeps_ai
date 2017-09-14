var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.work = function(creep) {
    
    var targets = funcs.myRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                    structure.energy < structure.energyCapacity;
            }
    });
    
    if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    }
    
}

role.bodies = [
    [CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE],
    [CARRY, CARRY, CARRY, WORK, MOVE, MOVE],
    [CARRY, CARRY, WORK, MOVE, MOVE],
    [CARRY, CARRY, WORK, MOVE],
    [CARRY, WORK, MOVE],
];

role.name = 'harvester';


module.exports = role;
