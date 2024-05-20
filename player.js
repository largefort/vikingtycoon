import * as me from 'melonjs';

class PlayerEntity extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, {
            image: "viking",
            width: 64,
            height: 64,
            framewidth: 64,
            frameheight: 64
        });

        // Initialize resources with starter values
        this.resources = {
            wood: settings.starterResources?.wood || 0,
            stone: settings.starterResources?.stone || 0,
            gold: settings.starterResources?.gold || 0
        };

        this.name = "Viking";
        this.abilities = {
            speed: 1,
            strength: 1
        };

        // Update UI with starter resources
        this.updateUI();
    }

    collectResource(resource) {
        if (resource.isAvailable) {
            this.resources[resource.type] += resource.value;
            resource.reset();
            this.updateUI();
        }
    }

    updateUI() {
        document.getElementById("wood-count").innerText = this.resources.wood;
        document.getElementById("stone-count").innerText = this.resources.stone;
        document.getElementById("gold-count").innerText = this.resources.gold;
    }
}

export default PlayerEntity;
