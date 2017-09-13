var funcs = require('funcs');

var roleUpgrader = {
    
    body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            // funcs.StoreSource(creep);
            creep.say('🔄 harvest');
	    }
	    
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('🚧 upgrade');
	    }

        
	    if(!creep.memory.upgrading) {
	        funcs.GetEnergy(creep);
	    }

        else {
            var cont = Game.rooms['W8N3'].controller;
            
            if(creep.upgradeController(cont) == ERR_NOT_IN_RANGE) {
                creep.moveTo(cont);
            }
        }
	}
};

module.exports = roleUpgrader;
