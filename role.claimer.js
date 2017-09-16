var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.run = function(creep) {
    
    var myRoom = Game.rooms[funcs.myRoomName];
    var nextRoomName = Game.map.describeExits(myRoom.name)[3]
    var nextRoom = Game.rooms[nextRoomName];    
    var cont = nextRoom.controller;
    if (!cont.my) { 
        if(creep.claimController(cont) == ERR_NOT_IN_RANGE) {
            creep.moveTo(cont);
        }
    }
    else {
        creep.memory.role = 'builder';
    }   
}

role.bodies = [[CLAIM, CLAIM, CARRY, WORK, MOVE, MOVE, MOVE]];
role.name = 'claimer';

module.exports = role;
