/*
BODYPART_COST: {
    "move": 50,
    "work": 100,
    "attack": 80,
    "carry": 50,
    "heal": 250,
    "ranged_attack": 150,
    "tough": 10,
    "claim": 600
}
*/
export class Profiles {
  static SMALL_WORKER = [WORK, CARRY, CARRY, MOVE, MOVE];
  static SMALL_RUNNER = [WORK, CARRY, MOVE, MOVE, MOVE];
  static MEDIUM_WORKER = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
  static MEDIUM_RUNNER = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY];
}
