var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.work = function(creep) {
	        
    var allStructures = Game.rooms['W8N3'].find(FIND_STRUCTURES)

    var damagedStructures = []
    var walls = []
    

    for (var n in allStructures) {
        structure = allStructures[n];

        if (structure.hits < structure.hitsMax) {
            if (structure.structureType == 'constructedWall') {
                walls.push(structure);
            }
            else {
                damagedStructures.push(structure);
            }
        }
    }

    if(damagedStructures.length) {
        // console.log('damaged: ', damagedStructures.length);

        max_struct = 0;

        for (w in damagedStructures) {
            struct = damagedStructures[w];
            if ((struct.hitsMax - struct.hits) > max_struct) {
                max_struct = struct.hitsMax - struct.hits;
                if (max_struct > 100) {
                    target = struct;
                }
                else {
                    target = false;
                }
            }
        }
        
    }
    
    // console.log(target);
    
    if (walls.length && !target) {
        
        // console.log('walls: ', walls.length);
        min_wall = 9999999;

        for (w in walls) {
            wall = walls[w];
            if (wall.hits < min_wall) {
                target = wall;
                min_wall = wall.hits;
            }
        }
    }
    
    if (Memory.last_target_id) {
        last_target = Game.getObjectById(Memory.last_target_id);
        
        // console.log(target.hits, last_target.hits);

        if ((last_target.hits) < (target.hits + 90)) {
            // console.log('kept');
            target = last_target;
        }
        else {
            // console.log('too close');
        }
        
    
    }
    
    // console.log(target.id, Memory.last_target_id);
    
    
    Memory.last_target_id = target.id; 

    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {reusePath: 30, visualizePathStyle: {stroke: '#ffffff'}});
    }

}

role.body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],

module.exports = role;
