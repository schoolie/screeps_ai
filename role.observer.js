var roleBaseWorker = require('role.baseWorker');
var roleBuilder = require('role.builder');
var funcs = require('funcs');

var role = Object.assign({}, roleBaseWorker); 

role.run = function(creep) {

    var myRoom = Game.spawns.Spawn1.room;
    var nextRoomName = Game.map.describeExits(myRoom.name)[7]
    
    var pos = new RoomPosition(25, 25, nextRoomName);
    
    if (creep.room.name != nextRoomName) {
        creep.moveTo(pos);
    }
    else {
        roleBuilder.run(creep);
    }


}

role.shouldSpawn = function(room) {
    // count = this.count(room) < this.max;
    
    count =_.filter(Game.creeps, (creep) => creep.memory.role == this.name).length < this.max;
    valid_gcl = Object.keys(Game.spawns).length < Game.gcl.level;
    
    return count && valid_gcl;
}

role.bodies = [[WORK, WORK, CARRY, MOVE, CARRY, MOVE]];
role.name = 'observer';

module.exports = role;
