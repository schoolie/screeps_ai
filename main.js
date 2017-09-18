var funcs = require('funcs');

var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleUpgrader = require('role.upgrader');
var roleObserver = require('role.observer');
var roleClaimer = require('role.claimer');
var roleMiner = require('role.mineral');


var statusCounter = 10;


module.exports.loop = function () {

    roleObserver.max = 0;
    roleHarvester.max = 7;
    roleUpgrader.max = 7;
    roleRepairer.max = 1;
    roleClaimer.max = 0; 
    roleBuilder.max = 5; 
    roleMiner.max = 3;
    
    var roles = [
        roleHarvester,
        roleUpgrader,
        roleObserver,
        roleRepairer,
        roleClaimer,
        roleBuilder,
        roleMiner,
    ]
    
    var myRooms = []
    for (s in Game.spawns) {
        var room = Game.spawns[s].room;
        if (!myRooms.includes(room)) {
            myRooms.push(Game.spawns[s].room);
        }
    }

    Memory.statusCount +=1

    for (r in myRooms) {
        // Get Current Room
        var myRoom = myRooms[r];
        
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
        if (Memory.statusCount == statusCounter) {
            console.log(myRoom.name,
                myRoom.energyAvailable,
                myRoom.energyCapacityAvailable,
                roles.map(function(x) {return ' ' + x.name + ': ' + x.count(myRoom) + '/' + x.max})
            );
        }
        

        // Spawn Management    
        var spawned = false;
        var selected = false;
        
        if (roleHarvester.count == 0) {
            myRoom.find(FIND_MY_SPAWNS)[0].createCreep([WORK,CARRY,MOVE], {role:'harvester'});
        }

        for (var r in roles) {
            
            if (!selected) {

                role = roles[r];
        
                count = role.count(myRoom);
        
                if (!spawned && role.shouldSpawn(myRoom)) {
                    
                    for (var b in role.bodies) {
        
                        var body = role.bodies[b];
                        var bodyCost = funcs.calcCost(body)
                        
                        if (!selected && bodyCost <= myRoom.energyCapacityAvailable) {
                            // this body is cheap enough to build
                            var selected_body = body;
                            selected = true;
                            // console.log('body', role.name, selected_body, bodyCost);

                        }
                    
                        var spawn_result = myRoom.find(FIND_MY_SPAWNS)[0].createCreep(selected_body, {role:role.name});

                        if (typeof spawn_result == 'string') {
                            console.log(myRoom.name, 'spawning ' + role.name);
                            spawned = true;
                            break;
                        }
                    }
                }
            }
        }

    }


    if (Memory.statusCount == statusCounter) {
        Memory.statusCount = 0;
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
