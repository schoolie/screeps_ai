module.exports = {

	getCreepsByRole: function() {
	    return _.filter(Game.creeps, (creep) => creep.memory.role == this.name);
    },

    count: function() {
        return this.getCreepsByRole().length;
    },
    
    shouldSpawn: function() {
        return this.count() < this.max;
    },

	bodies: [
	    [CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, MOVE, MOVE],
	    [CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE],
	    [CARRY, CARRY, CARRY, WORK, WORK, MOVE],
	    [CARRY, CARRY, WORK, WORK, MOVE],
	    [CARRY, WORK, WORK, MOVE],
	    [CARRY, WORK, MOVE],
	],

};
