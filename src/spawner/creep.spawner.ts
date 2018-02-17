import { General } from './../utils/general';
import { Profiles } from './../profiles/starter.profiles';
export class CreepSpawner {
    amount;
    harvesters;
    upgrader;
    builder;
    constructor(amount) {
        this.amount = amount || 2;
    }

    run() {
        this.harvesters = _.filter(Game.creeps, (creep) => creep.memory['role'] == 'harvester');
        this.builder = _.filter(Game.creeps, (creep) => creep.memory['role'] == 'builder');
        this.upgrader = _.filter(Game.creeps, (creep) => creep.memory['role'] == 'upgrader');
        this.freeMemory();
        this.spawn();
        this.visualizeSpawn();
    }

    freeMemory() {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }

    spawn() {
        if (this.harvesters.length < this.amount)
            this.spawnCreep(General.HOME_BASE, Profiles.SMALL_WORKER, 'harvester');
        else if (this.upgrader.length < this.amount + 1)
            this.spawnCreep(General.HOME_BASE, Profiles.SMALL_RUNNER, 'upgrader');
        else if (this.builder.length < this.amount)
            this.spawnCreep(General.HOME_BASE, Profiles.SMALL_WORKER, 'builder');
    }

    visualizeSpawn() {
        if (Game.spawns[General.HOME_BASE].spawning) {
            Game.spawns[General.HOME_BASE].room.visual.text(
                '🛠️' + Game.creeps[Game.spawns[General.HOME_BASE].spawning.name].memory['role'],
                Game.spawns[General.HOME_BASE].pos.x,
                Game.spawns[General.HOME_BASE].pos.y + 1,
                { align: 'left', opacity: 0.8 });
        }
    }

    spawnCreep(where, config, role) {
        Game.spawns[where].spawnCreep(config, role + Game.time, { memory: { role } });
    }
}
