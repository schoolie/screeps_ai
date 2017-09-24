var roleEnergyWorker = require('role.energyWorker');
var funcs = require('funcs');
var roleBuilder = require('role.builder');

var role = Object.assign({}, roleEnergyWorker); 

role.work = function(creep) {
    var target = undefined;

    var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                structure.energy < structure.energyCapacity;
        }
    });
    
    if(target != undefined) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
    else {
        roleBuilder.run(creep);
    }
    
}

role.name = 'harvester';


module.exports = role;
