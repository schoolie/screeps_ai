var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }



	    if(creep.memory.building) {
	        
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
	    
	    
	    else {
	        var source = creep.pos.findClosestByRange(FIND_SOURCES);

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {reusePath: 50, visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;
