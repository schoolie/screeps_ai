var roleBaseWorker = require('role.energyWorker');
var funcs = require('funcs');
var roleUpgrader = require('role.upgrader');

var role = Object.assign({}, roleBaseWorker); 

role.work = function(creep) {

    var target = undefined;

    if (creep.memory.targetId) {
        checkTarget = Game.getObjectById(creep.memory.targetId);
        if (checkTarget != undefined) {
            if (checkTarget.progressMax - checkTarget.progress > 0) {
                target = checkTarget;
            }
        }
    }
    
    if (target == undefined) {
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
                checkTarget = smallestTargets[t];
                dist = creep.pos.getRangeTo(checkTarget.pos);
                // console.log(target.pos, dist);

                if (dist < minDist) {
                    minDist = dist;
                    target = checkTarget;
                }
            }
        }
    }
    if (target) {
        creep.memory.targetId = target.id;
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        roleUpgrader.run(creep);
    }
}

role.shouldSpawn = function(room) {
    return (this.count(room) < this.max) && (room.find(FIND_CONSTRUCTION_SITES).length > 0);
};

role.name = 'builder';

module.exports = role;
