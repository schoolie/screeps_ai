var roleBaseWorker = require('role.energyWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.work = function(creep) {

	        
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    
    if(targets.length) {
        
        var minDiff = 99999999;
        
        for (var t in targets){
            var target = targets[t];
            var diff = target.progressTotal - target.progress;
            
            if (diff < minDiff){
                smallestTargets = [target];
                minDiff = diff;
            }
            else if (diff == minDiff) {
                smallestTargets.push(target);
            }
        }
        
        var minDist = 9999999;

        for (var t in smallestTargets) {
            target = smallestTargets[t];
            dist = creep.pos.getRangeTo(target.pos);
            console.log(target.pos, dist);

            if (dist < minDist) {
                minDist = dist;
                nearestTarget = target;
            }
        }
        
        if(creep.build(nearestTarget) == ERR_NOT_IN_RANGE) {
            creep.moveTo(nearestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    
    else {
        if (creep.memory.altRole) {
            creep.memory.role = creep.memory.altRole;
        }
        else {
            creep.memory.role = 'upgrader';
        }
    }
}

role.shouldSpawn = function(room) {
    return (this.count(room) < this.max) && (room.find(FIND_CONSTRUCTION_SITES).length > 0);
};

role.name = 'builder';

module.exports = role;
