export let roleHarvester = {
  run: (creep: Creep) => {
    if ((creep.carry.energy == 0 && (!creep.memory['action'] || creep.memory['action'] == 'transferring')) || creep.memory['action'] == 'harvesting') {
      creep.memory['action'] = 'harvesting';
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
      if (creep.carry.energy == creep.carryCapacity) creep.memory['action'] = 'transferring';
    } else {
      let targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].indexOf(<any>structure.structureType) > -1 && (<any>structure).energy < (<any>structure).energyCapacity;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return [STRUCTURE_RAMPART, STRUCTURE_ROAD].indexOf((<any>structure).structureType) > -1 && (<any>structure).hits < (<any>structure).hitsMax;
          }
        });
        if (targets.length > 0) {
          if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
          }
        } else {
          let sources = creep.room.find(FIND_SOURCES);
          creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  }
};
