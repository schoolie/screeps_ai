var funcs = require('funcs');

var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleUpgrader = require('role.upgrader');
var roleObserver = require('role.observer');
var roleClaimer = require('role.claimer');
// var roleMiner = require('role.miner');



// roleMiner.max = 0
roleObserver.max = 1;
roleHarvester.max = 9;
roleUpgrader.max = 9;
roleRepairer.max = 1;
roleClaimer.max = 3; 
roleBuilder.max = 5; 

roles = [
    // roleMiner,
    roleObserver,
    roleHarvester,
    roleUpgrader,
    roleRepairer,
    roleClaimer,
    roleBuilder,
]


module.exports.loop = function () {

    var myRooms = []
    for (s in Game.spawns) {
        var room = Game.spawns[s].room;
        if (!myRooms.includes(room)) {
            myRooms.push(Game.spawns[s].room);
        }
    }
    console.log(myRooms);

    for (r in myRooms) {
        // Get Current Room
        var myRoom = myRooms[r];
        // var myRoom = Game.rooms[funcs.myRoomName];
        
        
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
        var spawned = false;
        var selected = false;

        for (var r in roles) {
            
            if (!selected) {

                role = roles[r];
        
                count = role.count();
        
                if (!spawned && role.shouldSpawn()) {
                    
                    for (var b in role.bodies) {
        
                        var body = role.bodies[b];
                        var bodyCost = funcs.calcCost(body)
                        
                        if (!selected && bodyCost <= Game.spawns.Spawn1.room.energyCapacityAvailable) {
                            // this body is cheap enough to build
                            var selected_body = body;
                            selected = true;
                            console.log('body', role.name, selected_body, bodyCost);

                        }
                    
                        var spawn_result = Game.spawns.Spawn1.createCreep(selected_body, {role:role.name});

                        if (typeof spawn_result == 'string') {
                            console.log('spawning ' + role.name);
                            spawned = true;
                            break;
                        }
                    }
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
