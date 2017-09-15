module.exports = {

	getCreepsByRole: function() {
	    return _.filter(Game.creeps, (creep) => creep.memory.role == this.name);
    },

    count: function() {
        return this.getCreepsByRole().length;
    },

	bodies: [
	    [CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE],
	    // [CARRY, CARRY, CARRY, WORK, MOVE, MOVE],
	    // [CARRY, CARRY, WORK, MOVE, MOVE],
	    // [CARRY, CARRY, WORK, MOVE],
	    // [CARRY, WORK, MOVE],
	]
};