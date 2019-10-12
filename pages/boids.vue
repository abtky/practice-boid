<template>
  <no-ssr>
    <div>
      <div class="container">
        <canvas-container class="canvasContainer" ref="canvasComponent"></canvas-container>
      </div>
    </div>
  </no-ssr>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import SteeredVehicle from '../assets/ts/SteeredVehicle';
import CanvasContainer from '../components/CanvasContainer.vue';
import VehicleGUI from '../assets/ts/VehicleGUI';
import Worker from '~/assets/ts/index.worker';
import WorkerController from '../assets/ts/WorkerController';

const NUM_VEHICLES: number = 300;

@Component({
    components: {CanvasContainer}
})
class Boids extends Vue {
    timerId: Number;
    vehicles: SteeredVehicle[];
    gui: VehicleGUI;
    isPlay: boolean = false;
    worker: WorkerController;
    $refs!: {
        canvasComponent: CanvasContainer
    };
    head () {
        return {
            title: 'physics'
        }
    }
    async mounted(): void {

        this.vehicles = [];
            //this.vehicles = this.generateVehicles(NUM_VEHICLES);
        await this.$nextTick();
        this.gui = this.initGUI();
        this.worker = this.initWorker();
        this.play();
    }
    initGUI(): VehicleGUI {
        const gui = new VehicleGUI();
        gui.on('togglePlay', value => {
            console.log('onTogglePlay');
            if (value) {
                this.play();
            } else {
                this.pause();
            }
        });
        gui.on('changeNumbers', value => {
            console.log('onChangeNumbers');
            if (value > this.vehicles.length) {
                this.increaseVehicles(value);
            } else {
                this.vehicles.splice(value);
            }
            gui.target = this.vehicles;
            gui.update();
        });
        gui.init();
        return gui;
    }
    initWorker(): WorkerController {
        const worker: Worker = new Worker();
        const workerController: WorkerController = new WorkerController(worker);
        workerController.init(this.vehicles);
        return workerController;
    }
    increaseVehicles(amount: number): SteeredVehicle[] {
        const result: SteeredVehicle[] = this.vehicles;
        while(result.length < amount) {
            const vehicle: SteeredVehicle = new SteeredVehicle();
            vehicle.velocity.x = Math.random() * 2 - 1;
            vehicle.velocity.y = Math.random() * 2 - 1;
            vehicle.position.x = Math.random();
            vehicle.position.y = Math.random() * this.$refs.canvasComponent.aspectRatio;
            result.push(vehicle);
        }
        return result;
    }
    play() {
        this.isPlay = true;
        this.worker.play();
        this.loop();
    }
    pause() {
        this.worker.pause();
        this.isPlay = false;
    }
    loop() {
        cancelAnimationFrame(this.timerId);
        const canvas = this.$refs.canvasComponent;
        canvas.clearCanvas();

        // console.time('calcPositions');
        if (this.isPlay) {
            this.vehicles.forEach(vehicle => {
                vehicle.update();
            });
        }
        // console.timeEnd('calcPositions');

        // console.time('draw');
        canvas.drawVehicles(this.vehicles, '#fff');
        // console.timeEnd('draw');
        this.timerId = requestAnimationFrame(() => {
            this.loop();
        });
    }
}
export default Boids;
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
