import { CoreAI } from './ai/core.ai';
import { roleUpgrader } from './roles/upgrader.role';
import { roleHarvester } from './roles/harvester.role';
import { roleBuilder } from './roles/builder.roles';
import { CreepSpawner } from './spawner/creep.spawner';
import { ErrorMapper } from "utils/ErrorMapper";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    //let ai = new CoreAI();
    let spawner = new CreepSpawner(1);
    spawner.run();
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory['role'] == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory['role'] == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory['role'] == 'builder') {
            roleBuilder.run(creep);
        }
    }

});
