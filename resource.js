import * as me from 'melonjs';

class ResourceEntity extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, {
            image: settings.type,
            width: 32,
            height: 32,
            framewidth: 32,
            frameheight: 32
        });

        this.type = settings.type;
        this.value = this.getValueBasedOnType();
        this.isAvailable = true;
    }

    getValueBasedOnType() {
        switch (this.type) {
            case 'wood': return 10;
            case 'stone': return 5;
            case 'gold': return 2;
            default: return 1;
        }
    }

    reset() {
        this.isAvailable = false;
        me.timer.setTimeout(() => {
            this.isAvailable = true;
        }, 3000);
    }
}

export default ResourceEntity;
