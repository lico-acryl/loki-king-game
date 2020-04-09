// It doesn't use mobSize yet.
class MobSpawnManager {
    constructor(mapWidth, mapHeight, mobSize) {
        this.mobs = [];
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.mobSize = mobSize;
    }

    getMobs() {
        return this.mobs;
    }

    spawnMob() {
        const spawnCases = Math.floor(Math.random() * 4);

        let newMob = {};
        switch (spawnCases) {
            case 0:
                newMob = {
                    x: Math.floor(
                        Math.random() * (this.mapWidth - this.mobSize)
                    ),
                    y: 0,
                };
                break;
            case 1:
                newMob = {
                    x: Math.floor(
                        Math.random() * (this.mapWidth - this.mobSize)
                    ),
                    y: this.mapHeight - this.mobSize,
                };
                break;
            case 2:
                newMob = {
                    x: 0,
                    y: Math.floor(
                        Math.random() * (this.mapHeight - this.mobSize)
                    ),
                };
                break;
            case 3:
                newMob = {
                    x: this.mapWidth - this.mobSize,
                    y: Math.floor(
                        Math.random() * (this.mapHeight - this.mobSize)
                    ),
                };
                break;
            default:
                return;
        }

        newMob.size = this.mobSize;
        newMob.type = Math.floor(Math.random() * 2);

        this.mobs.push(newMob);
    }

    moveMobs(targetPos) {
        this.mobs = this.mobs.map((mob) => {
            if (mob.x < targetPos.x) {
                mob.x += 5;
            } else {
                mob.x -= 5;
            }

            if (mob.y < targetPos.y) {
                mob.y += 5;
            } else {
                mob.y -= 5;
            }

            return { ...mob };
        });
    }
}

export default MobSpawnManager;
