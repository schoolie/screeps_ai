var funcs = require('funcs');

var roleHarvester = require('role.newHarvester');

// var roleNewHarvester = require('role.newHarvester');
// var roleNewUpgrader = require('role.newUpgrader');

// var roleBuilder = require('role.builder');
var roleRepairer = require('role.newRepairer');
var roleUpgrader = require('role.newUpgrader');
// var roleMiner = require('role.miner');

// var roleSpawnTransporter = require('role.spawnTransporter');


// roleMiner.max = 0
roleHarvester.max = 10
roleUpgrader.max = 10,
roleRepairer.max = 5
// roleBuilder.max = 0


roles = [
    // roleMiner,
    roleHarvester,
    roleUpgrader,
    roleRepairer,
    // roleBuilder,
]

var myRoom = funcs.myRoom;

var maxHarvesters = 10;
var maxUpgraders = 10;
var maxRepairers = 5;
var maxBuilders = 0;
var maxMiners = 0;

module.exports.loop = function () {

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
    
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    
    

    console.log(Game.rooms['W8N3'].energyAvailable,
        myRoom.energyCapacityAvailable,
        miners.length,
        harvesters.length, 
        upgraders.length, 
        repairers.length, 
        builders.length, 
        claimers.length
    );
    
    defBody = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE];
    
    
    
    if (true) {    
        
        if (miners.length < maxMiners) {
            spawned = Game.spawns.Spawn1.createCreep(roleMiner.body, {role:'miner', sourceNum:Memory.lastMinerID});
            if (typeof spawned == 'string') {
                console.log(spawned);
                Memory.lastMinerID = (Memory.lastMinerID + 1) % 2
            }

        }
        
        else if (harvesters.length < maxHarvesters) {
            Game.spawns.Spawn1.createCreep(roleHarvester.body, {role:'harvester'});

        }
        
        else if (upgraders.length < maxUpgraders) {
            Game.spawns.Spawn1.createCreep(defBody, {role:'upgrader'});
        }
        
        else if (repairers.length < maxRepairers) {
            Game.spawns.Spawn1.createCreep(defBody, {role:'repairer'});
        }
        
        else if (builders.length < maxBuilders && myRoom.find(FIND_CONSTRUCTION_SITES).length > 0) {
            Game.spawns.Spawn1.createCreep(defBody, {role:'builder'});
        }
        
        // if (claimers.length < 1) {
        //     Game.spawns.Spawn1.createCreep([CLAIM, WORK, CARRY, MOVE, MOVE], {role:'claimer'});
        // }
    }

    for(var name in Game.creeps) {
        
        
        
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            // roleNewHarvester.run(creep);
            // roleSpawnTransporter.run(creep);
        }
        
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        };
        
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            // roleNewUpgrader.run(creep);
        };
        
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        };
        
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        };
        
        if(creep.memory.role == 'spawnTransporter') {
            roleSpawnTransporter.run(creep);
        };
        
    }
}
