<template>
  <div class="container">
    <div class="canvasContainer" ref="canvasContainer">
      <canvas
              ref="canvas"
              @click="onClick"></canvas>
    </div>
    <p class="console">{{getConsoleString()}}</p>
  </div>
</template>

<script lang="ts">
import Logo from '~/components/Logo.vue'
import Vehicle from "../assets/ts/Vehicle";
import { Component, Vue } from 'vue-property-decorator';
import SteeredVehicle from '../assets/ts/SteeredVehicle';
import Vector2D from "../assets/ts/Vector2D";

@Component({
    components: {}
})
class Index extends Vue {
    target: Vector2D;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    timerId: Number;
    vehicle: SteeredVehicle;
    vehicles: SteeredVehicle[];
    $refs!: {
        canvas: HTMLCanvasElement;
        canvasContainer: HTMLElement
    };
    getConsoleString() {
        const rows: string[] = [];
        if(this.target) {
            rows.push(`target x: ${this.target.x} y: ${this.target.y}`);
        }
        return rows.join('\n');
    }
    async mounted(): void {
        this.target = new Vector2D(800, 200);
        await this.$nextTick();
        this.canvas = this.$refs.canvas;
        this.canvas.width = 1280;
        this.canvas.height = 1280;
        this.context = this.canvas.getContext('2d');
        const container = this.$refs.canvasContainer;
        container.appendChild(this.canvas);
        console.log('container', container);
        console.log('start', this.start);
        this.vehicles = this.generateVehicles(300);
        this.start();
    }
    generateVehicles(amount: number) {
        const result: SteeredVehicle[] = [];
        while(result.length < amount) {
            const vehicle: SteeredVehicle = new SteeredVehicle();
            vehicle.velocity.x = Math.random() * 100 - 50;
            vehicle.velocity.y = Math.random() * 100 - 50;
            vehicle.position.x = Math.random() * 1280;
            vehicle.position.y = Math.random() * 1280;
            vehicle.maxSpeed = Math.random() + 2.0;
            result.push(vehicle);
        }
        return result;
    }
    start() {
        cancelAnimationFrame(this.timerId);
        this.loop();
    }
    onClick(e) {
        console.log(e);
        console.log(this.target);
        // this.target.x = e.offsetX * 2;
        // this.target.y = e.offsetY * 2;
        this.target = new Vector2D(e.offsetX * 2, e.offsetY * 2);
        console.log(this.target);
        this.$forceUpdate();
    }
    loop() {
        cancelAnimationFrame(this.timerId);
        console.time('loop');
        // console.log(this.target);
        const canvas = this.canvas;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;
        context.clearRect(0, 0, cw, ch);
        context.save();
        context.fillStyle = '#000';
        context.beginPath();
        context.rect(0, 0, cw, ch);
        context.closePath();
        context.fill();
        context.restore();

        this.vehicles.forEach(vehicle => {
            vehicle.seek(this.target);
            vehicle.update();
            const position = vehicle.position.clone();
            while(position.x < 0) {
                position.x += 1280;
            };
            while(position.y < 0) {
                position.y += 1280;
            };
            position.x = position.x % 1280;
            position.y = position.y % 1280;
            vehicle.position = position;
            context.save();
            context.translate(position.x, position.y);
            context.rotate(vehicle.velocity.angle);
            context.fillStyle = '#fff';
            context.beginPath();
            context.moveTo(10, 0);
            context.lineTo(-10, 5);
            context.lineTo(-10, -5);
            //context.arc(0, 0, 2, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            context.restore();
        });

        context.save();
        context.translate(this.target.x, this.target.y);
        context.fillStyle = '#f00';
        context.beginPath();
        context.beginPath();
        context.arc(0, 0, 8, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.restore();
        console.timeEnd('loop');
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
