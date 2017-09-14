var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.work = function(creep) {

	        
    var targets = funcs.myRoom.find(FIND_CONSTRUCTION_SITES);
    
    if(targets.length) {
        
        var minDiff = 99999999;

        for (var t in targets){
            var target = targets[t];
            var diff = target.progressTotal - target.progress;
            
            if (diff < minDiff){
                var smallestTarget = target;
                minDiff = diff;
            }
        }

        if(creep.build(smallestTarget) == ERR_NOT_IN_RANGE) {
            creep.moveTo(smallestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    
    else {
        creep.memory.role = 'upgrader';
    }
}

role.name = 'builder';

module.exports = role;
