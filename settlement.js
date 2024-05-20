import * as me from 'melonjs';

class SettlementEntity extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, {
            image: "settlement",
            width: 128,
            height: 128,
            framewidth: 128,
            frameheight: 128
        });

        this.capacity = 5; // Number of Vikings the settlement can support
    }

    addViking(viking) {
        if (this.capacity > 0) {
            this.capacity--;
            viking.setPosition(this.pos.x + Math.random() * 100, this.pos.y + Math.random() * 100);
        }
    }
}

export default SettlementEntity;
