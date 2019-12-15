<template>
  <div class="container">
    <boids-renderer class="canvasContainer" ref="canvasComponent"></boids-renderer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import SteeredVehicle from '../assets/scripts/boids/SteeredVehicle';
import BoidsRenderer from '../components/boids/BoidsRenderer';
import BoidsGUI from '../assets/scripts/boids/BoidsGUI';
import Worker from '../assets/scripts/boids/index.worker';
import WorkerController from '../assets/scripts/boids/WorkerController';

const NUM_VEHICLES: number = 300;

@Component({
    components: {BoidsRenderer}
})
class Boids extends Vue {
    timerId: Number;
    vehicles: SteeredVehicle[];
    gui: BoidsGUI;
    isPlay: boolean = false;
    worker: WorkerController;
    $refs!: {
        canvasComponent: BoidsRenderer
    };
    head () {
        return {
            title: 'boids'
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
    initGUI(): BoidsGUI {
        const gui = new BoidsGUI();
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

<style lang="scss" scoped>
body {
  position: relative;
  height: 100%;
}
.container {
  position: relative;
  height: 100vh;
}
</style>
