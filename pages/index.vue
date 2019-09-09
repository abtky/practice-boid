<template>
  <div class="container">
    <canvas-container ref="canvasComponent" @click="onClick"></canvas-container>
    <p class="console">{{getConsoleString()}}</p>
  </div>
</template>

<script lang="ts">
import Logo from '~/components/Logo.vue'
import Vehicle from "../assets/ts/Vehicle";
import { Component, Vue } from 'vue-property-decorator';
import SteeredVehicle from '../assets/ts/SteeredVehicle';
import Vector2D from "../assets/ts/Vector2D";
import CanvasContainer from '~/components/CanvasContainer.vue';


@Component({
    components: {CanvasContainer}
})
class Index extends Vue {
    target: Vector2D;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    timerId: Number;
    vehicle: SteeredVehicle;
    vehicles: SteeredVehicle[];
    $refs!: {
        canvasComponent: CanvasContainer
    };
    getConsoleString() {
        const rows: string[] = [];
        if(this.target) {
            rows.push(`target x: ${this.target.x} y: ${this.target.y}`);
        }
        return rows.join('\n');
    }
    async mounted(): void {
        this.target = new Vector2D(0.2, 0.6);
        await this.$nextTick();
        this.vehicles = this.generateVehicles(500);
        this.start();
    }
    generateVehicles(amount: number) {
        const result: SteeredVehicle[] = [];
        while(result.length < amount) {
            const vehicle: SteeredVehicle = new SteeredVehicle();
            vehicle.velocity.x = Math.random();
            vehicle.velocity.y = Math.random();
            vehicle.position.x = Math.random();
            vehicle.position.y = Math.random();
            // vehicle.maxSpeed = 2.0;
            result.push(vehicle);
        }
        return result;
    }
    start() {
        cancelAnimationFrame(this.timerId);
        this.loop();
    }
    onClick(pos) {
        console.log('onCLick: 01', pos);
        console.log('onCLick: 02', this.target);
        this.target = pos;
    }
    loop() {
        cancelAnimationFrame(this.timerId);
        const canvas = this.$refs.canvasComponent;
        canvas.clearCanvas();
        this.vehicles.forEach((vehicle, i) => {
            while(vehicle.position.x < 0) {
                vehicle.position.x += 1;
            }
            while(vehicle.position.x > 1) {
                vehicle.position.x -= 1;
            }
            while(vehicle.position.y < 0) {
                vehicle.position.y += 1;
            }
            while(vehicle.position.y > 1) {
                vehicle.position.y -= 1;
            }
            vehicle.flock(this.vehicles);
            // vehicle.flee(this.target);
            vehicle.update();
        });
        canvas.drawVehicles(this.vehicles);
        // console.timeEnd('loop');
        this.timerId = requestAnimationFrame(() => {
            this.loop();
        });
    }
    methods: {

    }
}
export default Index;
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    color: #f00;
  }
}
.console {
  position: absolute;
  border: solid 1px #ccc;
  min-height: 20px;
  top: 0;
  left: 0;
  color: #fff;
  background: #000;
  font-size: 12px;
  padding: 4px 10px;
  white-space: pre-wrap;
  text-align: left;
}
  .canvasContainer {
    width: 640px;
    height: 640px;
    background: #ccc;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
