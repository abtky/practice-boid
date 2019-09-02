<template>
  <div class="container">
    <h1 class="title">
      study_template??
    </h1>
    <div class="canvasContainer" ref="canvasContainer"></div>
  </div>
</template>

<script lang="ts">
import Logo from '~/components/Logo.vue'
import Vehicle from "../assets/ts/Vehicle";

export default {
    components: {},
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    timerId: Number,
    vehicle: Vehicle,
    async mounted(): void {
        await this.$nextTick();
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 1280;
        this.context = this.canvas.getContext('2d');
        const container = this.$refs.canvasContainer;
        container.appendChild(this.canvas);
        console.log('container', container);
        console.log('start', this.start);
        this.vehicle = new Vehicle();
        this.vehicle.velocity.x = 8;
        this.vehicle.velocity.y = 2;
        this.start();
    },
    methods: {
        start() {
            cancelAnimationFrame(this.timerId);
            this.loop();
        },
        loop() {
            cancelAnimationFrame(this.timerId);
            this.vehicle.update();
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
            context.save();
            const position = this.vehicle.position;

            context.translate( position.x % 1280, position.y % 1280 );
            context.fillStyle = '#fff';
            context.beginPath();
            context.arc(0, 0, 2, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            context.restore();
            this.timerId = requestAnimationFrame(() => {
                this.loop();
            });
        }
    }
}
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
