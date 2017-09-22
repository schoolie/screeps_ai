var funcs = require('funcs');

module.exports = {

	getCreepsByRole: function(room) {
	    return _.filter(Game.creeps, (creep) => creep.memory.role == this.name && creep.room.name == room.name);
    },

    count: function(room) {
        // console.log(room);
        // room = funcs.myRoom;
        return this.getCreepsByRole(room).length;
    },
    
    shouldSpawn: function(room) {
        return this.count(room) < this.max;
    },

	bodies: [
	    [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, MOVE, MOVE],
	    [CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE],
	    [CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE],
	    [CARRY, CARRY, CARRY, WORK, WORK, MOVE],
	    [CARRY, CARRY, WORK, WORK, MOVE],
	    [CARRY, WORK, WORK, MOVE],
	    [CARRY, WORK, MOVE],
	],

};
