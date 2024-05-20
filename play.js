import * as me from 'melonjs';
import PlayerEntity from '../entities/player.js';
import ResourceEntity from '../entities/resource.js';
import BuildingEntity from '../entities/building.js';
import SettlementEntity from '../entities/settlement.js';

class PlayScreen extends me.Stage {
    onResetEvent() {
        me.game.world.addChild(new me.ColorLayer("background", "#3a9bdc"), 0);

        this.players = [];
        this.addPlayer();

        this.resources = [];
        this.addResource("wood", 100, 100);
        this.addResource("stone", 200, 100);
        this.addResource("gold", 300, 100);

        this.settlements = [];
        this.buildings = [];

        me.pool.register("player", PlayerEntity);
        me.pool.register("resource", ResourceEntity);
        me.pool.register("building", BuildingEntity);
        me.pool.register("settlement", SettlementEntity);

        me.timer.setInterval(this.collectResources.bind(this), 1000);

        document.getElementById("hire-viking").addEventListener("click", this.hireViking.bind(this));
        document.getElementById("build-settlement").addEventListener("click", this.buildSettlement.bind(this));
        document.getElementById("build-farm").addEventListener("click", this.buildFarm.bind(this));
    }

    addPlayer() {
        let player = me.pool.pull("player", 100, 100);
        this.players.push(player);
        me.game.world.addChild(player, 1);
    }

    addResource(type, x, y) {
        let resource = me.pool.pull("resource", x, y, { type: type });
        this.resources.push(resource);
        me.game.world.addChild(resource, 1);
    }

    collectResources() {
        this.players.forEach(player => {
            this.resources.forEach(resource => {
                player.collectResource(resource);
            });
        });
    }

    hireViking() {
        if (this.players[0].resources.gold >= 100) {
            this.players[0].resources.gold -= 100;
            this.addPlayer();
            document.getElementById("gold-count").innerText = this.players[0].resources.gold;
        }
    }

    buildSettlement() {
        if (this.players[0].resources.wood >= 200 && this.players[0].resources.stone >= 100) {
            this.players[0].resources.wood -= 200;
            this.players[0].resources.stone -= 100;
            let settlement = me.pool.pull("settlement", 400, 100);
            this.settlements.push(settlement);
            me.game.world.addChild(settlement, 1);
        }
    }

    buildFarm() {
        if (this.players[0].resources.wood >= 50 && this.players[0].resources.stone >= 20) {
            this.players[0].resources.wood -= 50;
            this.players[0].resources.stone -= 20;
            let farm = me.pool.pull("building", 500, 100, { type: "farm" });
            this.buildings.push(farm);
            me.game.world.addChild(farm, 1);
        }
    }

    onDestroyEvent() {
        this.players.forEach(player => me.game.world.removeChild(player));
        this.resources.forEach(resource => me.game.world.removeChild(resource));
        this.settlements.forEach(settlement => me.game.world.removeChild(settlement));
        this.buildings.forEach(building => me.game.world.removeChild(building));
    }
}

export default PlayScreen;
