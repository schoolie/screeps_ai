var roleBaseWorker = require('role.baseWorker');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.run = function(creep) {

    var myRoom = Game.rooms[funcs.myRoomName];
    var nextRoomName = Game.map.describeExits(myRoom.name)[3]
    
    var pos = new RoomPosition(25, 25, nextRoomName);
    creep.moveTo(pos);

}
role.bodies = [[MOVE]];
role.name = 'observer';

module.exports = role;
