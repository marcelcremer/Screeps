import { roleUpgrader } from './upgrader.role';
export let roleBuilder = {
  run: (creep) => {
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length == 0) {
      roleUpgrader.run(creep);
      return;
    }
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      let constructionTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (constructionTargets.length) {
        let closestTarget = null;
        let cost = 100000;
        for (let target of constructionTargets) {
          let currentCost = PathFinder.search(creep.pos, target).cost;
          if (currentCost < cost) {
            closestTarget = target;
            cost = currentCost;
          }
        }
        if (creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestTarget, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    } else {
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }
};
