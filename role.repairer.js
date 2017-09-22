var roleBaseWorker = require('role.energyWorker');
var funcs = require('funcs');
var roleUpgrader = require('role.upgrader');

var role = Object.assign({}, roleBaseWorker); 

role.work = function(creep) {
	
    var target = undefined;
    var repDiff = 90;


    if (creep.memory.targetId) {
        checkTarget = Game.getObjectById(creep.memory.targetId);
        if (checkTarget.hitsMax - checkTarget.hits > repDiff) {
            target = checkTarget;
        }
    }

    if (target == undefined) {    
        var allStructures = creep.room.find(FIND_STRUCTURES)

        var damagedStructures = []
        var roads = []
        

        for (var n in allStructures) {
            structure = allStructures[n];

            if (structure.hits < structure.hitsMax) {
                if (structure.structureType == STRUCTURE_ROAD) {
                    roads.push(structure);
                }
                else {
                    damagedStructures.push(structure);
                }
            }
        }

        if (roads.length) {
            
            min_road = 9999999;

            for (r in roads) {
                road = roads[r];
                if (road.hits < min_road && road.hitsMax - road.hits > repDiff) {
                    target = road;
                    min_road = road.hits;
                }
            }
            // console.log(creep.memory.targetId);
        }
    }
    
    // Memory.last_target_id = target.id; 
    if (target) {
        creep.memory.targetId = target.id;
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        roleUpgrader.run(creep);
    }

}

role.name = 'repairer';

module.exports = role;
