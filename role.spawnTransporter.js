var funcs = require('funcs');

var roleSpawnTransporter = {
    
    body: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY,],

    /** @param {Creep} creep **/
    run: function(creep) {
        
        console.log(creep.memory.transporting)
        
	    if(creep.memory.transporting && creep.carry.energy == 0) {
            creep.memory.transporting = false;
            // creep.say('🔄 harvest');
	    }
	    
	    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transporting = true;
	       // creep.say('🚧 transport');
	    }


	    if(!creep.memory.transporting) {

            var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                               i.store[RESOURCE_ENERGY] > 0}
            );
            
            console.log(containersWithEnergy);
            console.log(creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType != STRUCTURE_ROAD && i.structureType != STRUCTURE_WALL && i.structureType != STRUCTURE_EXTENSION}));
            
            if(containersWithEnergy.length > 0) {
                if(creep.pickup(containersWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containersWithEnergy[0]);
                }
            }
        }
        
        
        else {
            var targets = funcs.myRoom.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};

module.exports = roleSpawnTransporter;
