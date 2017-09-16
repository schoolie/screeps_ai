module.exports = {
    
    
    myRoom: Game.spawns.Spawn1.room,
    myRoomName: Game.spawns.Spawn1.room.name,
    
    calcCost: function(body) {
        total_cost = 0;
        for (p in body) {
            part = body[p];
            cost = BODYPART_COST[part];
            total_cost += cost;
        }
        return total_cost;
    },

    // FindEnergy(creep) {
    //     dropped = this.myRoom.find(FIND_DROPPED_RESOURCES);
    //     // console.log(dropped[0].pos);
    //     // return dropped[0].id;
    // },
    
    // StoreSource(creep) {
    //     creep.memory.sourceID = this.FindEnergy(creep);
    // },
    
    GetEnergy(creep) {
        var dropped = Game.getObjectById(creep.memory.sourceID);
        // console.log(dropped);
        // if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(dropped);
        // }
        
        var source = this.FindSource(creep);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }

    },
        
    FindSource(creep) {
        
        // console.log('init ID',creep.name, creep.memory.SourceID);
        
        // If creep has a current source
        // if (creep.memory.SourceID) {
            
        //     var source = Game.getObjectById(creep.sourceID);
        //     console.log('existing source', source)
        //     // if (source.energy <= 10) {
        //     //     creep.memory.sourceID = null;
        //     // }
            
        // }
        
        // // Find nearby full sources
        // else {
        //     var sources = Game.rooms['W8N3'].find(FIND_SOURCES, {filter: function(source) {return source.energy >= 10;}});
        //     var source = sources[0];
        // }
        
        
        // var source1 = Game.getObjectById('26f20772347f879');
        // var source2 = Game.getObjectById('71ac0772347ffe6');
        
        // if (source1.energy > 0) {
        //     source = source1;
        // }
        // else {
        //     source = source2;
        // }
        
        var source = creep.pos.findClosestByRange(FIND_SOURCES);
        
        // creep.memory.sourceID = source.id
        
        return source;
    },
    
    
    GetCreepsByRole(role){
        var CreepList = [];
            for (var creepname in Game.creeps){
                if (Game.creeps[creepname].memory.role == role){
                    CreepList.push(Game.creeps[creepname]);
                }
            }
        return CreepList
    }
    
}
