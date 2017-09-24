var roleBaseWorker = require('role.baseWorker');
var roleObserver = require('role.observer');
var roleBuilder = require('role.builder');

var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.run = function(creep) {
    
    var myRoom = Game.spawns.Spawn1.room;
    var nextRoomName = Game.map.describeExits(myRoom.name)[7]
    var nextRoom = Game.rooms[nextRoomName];    
    var cont = nextRoom.controller;
    if (!cont.my) { 
        if(creep.claimController(cont) == ERR_NOT_IN_RANGE) {
            creep.moveTo(cont);
        }
    }
    else {
        roleBuilder.run(creep);
    }   
}

role.shouldSpawn = roleObserver.shouldSpawn;


role.bodies = [[CLAIM, CLAIM, CARRY, WORK, MOVE, MOVE, MOVE]];
role.name = 'claimer';

module.exports = role;
