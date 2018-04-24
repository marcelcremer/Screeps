export class CoreAI {
    creeps: any[] = [];
    constructor() {
        for (let creep in Game.creeps) {
            this.creeps.push(Game.creeps[creep]);
        }
        for (let room in Game.rooms) {
            this.checkRoom(Game.rooms[room]);
        }
    }

    checkRoom(room: Room) {
        console.log(`Processing room ${room}`);
        let energySources = this.checkForEnergySources(room);
        console.log(`Available Energy Sources: ${energySources.length}`);
        this.assignEnergyCreeps(room, energySources);
    }

    assignEnergyCreeps(room:Room, energySources)
    {
        let missingEnergy = this.checkForMissingEnergy(room);
        console.log(`Found ${missingEnergy.length} structures lacking energy`);
    }

    checkForMissingEnergy(room: Room) {
        let targets = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        return targets || [];
    }

    checkForEnergySources(room) {
        return room.find(FIND_SOURCES_ACTIVE) || [];
    }

    findNearestCreep(target)
    {
        let creep = null;
        let cost = 1000000000;
        for(let currentCreep of this.creeps)
        {
            let pathCost = PathFinder.search(currentCreep.pos, target).cost;
            if(pathCost < cost)
            {
                creep = currentCreep;
                cost = pathCost;
            }
        }
        return creep;
    }
}
