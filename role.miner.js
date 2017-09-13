var funcs = require('funcs');

var roleMiner = {
    
    // body: [WORK, WORK, WORK, WORK, WORK, MOVE],
    body: [WORK, WORK, WORK, MOVE],

    /** @param {Creep} creep **/
    run: function(creep) {
        
        sourceNum = 
        
        source = Game.getObjectById(funcs.sourceIDs[creep.memory.sourceNum]);
        var harvestPos = funcs.minerLocs[creep.memory.sourceNum];
        // console.log(harvestPos, creep.memory.sourceNum);
        
        if (creep.pos.x == harvestPos.x && creep.pos.y == harvestPos.y) {
            creep.memory.mining = true;
        }
        else {
            creep.memory.mining = false;
        }

	    if (!creep.memory.mining) {
            creep.moveTo(harvestPos);
        }
        
        else {
            creep.harvest(source);
        }
        
	}
};

module.exports = roleMiner;
