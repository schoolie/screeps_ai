var funcs = require('funcs');

var roleHarvester = require('role.newHarvester');
var roleBuilder = require('role.newBuilder');
var roleRepairer = require('role.newRepairer');
var roleUpgrader = require('role.newUpgrader');
// var roleMiner = require('role.miner');



// roleMiner.max = 0
roleHarvester.max = 10
roleUpgrader.max = 10
roleRepairer.max = 5
roleBuilder.max = 5

roles = [
    // roleMiner,
    roleHarvester,
    roleUpgrader,
    roleRepairer,
    roleBuilder,
]


module.exports.loop = function () {
    
    // Get Current Room
    var myRoom = Game.rooms[funcs.myRoomName];

    //clear memory of dead creeps
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    // Tower
    var hostiles = myRoom.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        console.log(hostiles);
        var towers = myRoom.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
    
    // Status Console Message
    console.log(myRoom.energyAvailable,
        myRoom.energyCapacityAvailable,
        roles.map(function(x) {return ' ' + x.name + ': ' + x.count() + '/' + x.max})
    );

    // Spawn Management    
    spawned = false;

    for (r in roles) {
        role = roles[r];

        count = role.count();

        if (count < role.max && !spawned) {
            
            for (b in role.bodies) {

                body = role.bodies[b];
                spawned = Game.spawns.Spawn1.createCreep(body, {role:role.name});
                
                console.log('body', role.name, body, spawned);

                if (typeof spawned == 'string') {
                    console.log('spawning ' + role.name);
                    spawned = true;

                    break;
                }
            }
        }
    }


    // Role Actions
    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];

        for (r in roles) {
            role = roles[r];

            if(creep.memory.role == role.name) {
                role.run(creep);
            }
        }        
    }
}
