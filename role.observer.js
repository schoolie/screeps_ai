var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.run = function(creep) {

    var myRoom = Game.rooms[funcs.myRoomName];
    var nextRoomName = Game.map.describeExits(myRoom.name)[3]
    
    var pos = new RoomPosition(25, 25, nextRoomName);
    
    if (creep.room.name != nextRoomName) {
        creep.moveTo(pos);
    }
    else {
        creep.memory.role = 'builder';
    }

}
role.bodies = [[WORK, WORK, CARRY, MOVE, CARRY, MOVE]];
role.name = 'observer';

module.exports = role;
