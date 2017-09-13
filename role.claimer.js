var funcs = require('funcs');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.carry.energy < creep.carryCapacity) {
            funcs.HarvestNearest(creep);
        }
        
        else {
            var cont = funcs.myRoom.controller;
            
            // var cont1 = Game.rooms['W8N3'].controller;
            // if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
            
            if(creep.claimController(cont) == ERR_NOT_IN_RANGE) {
                creep.moveTo(cont);
            }
        }
	}
};

module.exports = roleUpgrader;
