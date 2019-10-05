<template>
  <div>
    <div class="container">
      <canvas-container class="canvasContainer" ref="canvasComponent"></canvas-container>
    </div>
    <div>
      <button @click="onClickToggle">{{buttonLabel}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vehicle from "../assets/ts/Vehicle";
import { Component, Vue } from 'vue-property-decorator';
import SteeredVehicle from '../assets/ts/SteeredVehicle';
import CanvasContainer from '~/components/CanvasContainer.vue';
import VehicleGUI from '../assets/ts/VehicleGUI';

const NUM_VEHICLES: number = 400;

@Component({
    components: {CanvasContainer}
})
class Index extends Vue {
    timerId: Number;
    vehicles: SteeredVehicle[];
    gui: VehicleGUI;
    isInProgress: boolean = false;
    $refs!: {
        canvasComponent: CanvasContainer
    };
    get buttonLabel(): string {
        return this.isInProgress ? 'PAUSE' : 'PLAY';
    }
    onClickToggle() {
        if (this.isInProgress) {
            this.pause();
        } else {
            this.play();
        }
    }
    async mounted(): void {
        this.gui = new VehicleGUI();
        await this.$nextTick();
        this.vehicles = this.generateVehicles(NUM_VEHICLES);
        this.play();
    }
    generateVehicles(amount: number) {
        const result: SteeredVehicle[] = [];
        while(result.length < amount) {
            const vehicle: SteeredVehicle = new SteeredVehicle();
            vehicle.velocity.x = Math.random() * 2 - 1;
            vehicle.velocity.y = Math.random() * 2 - 1;
            vehicle.position.x = Math.random();
            vehicle.position.y = Math.random();
            // vehicle.maxSpeed = 2.0;
            result.push(vehicle);
        }
        return result;
    }
    play() {
        cancelAnimationFrame(this.timerId);
        this.isInProgress = true;
        this.loop();
    }
    pause() {
        cancelAnimationFrame(this.timerId);
        this.isInProgress = false;
    }
    loop() {
        cancelAnimationFrame(this.timerId);
        const canvas = this.$refs.canvasComponent;
        canvas.clearCanvas();

        this.vehicles.forEach((vehicle, i) => {
            vehicle.flock(this.vehicles);
            vehicle.update();
        });
        canvas.drawVehicles(this.vehicles, '#fc0');
        this.timerId = requestAnimationFrame(() => {
            this.loop();
        });
    }
}
export default Index;
</script>

<style lang="scss">
body {
  position: relative;
  height: 100%;
}
.container {
  position: relative;
  height: 100vh;
}
.canvasContainer {
  width: 100%;
  height: 100%;
  background: #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
