module.exports = {
    count: function() {
        return _.filter(Game.creeps, (creep) => creep.memory.role == this.name);
    }

};