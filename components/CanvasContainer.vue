<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height" @click="onClick"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import SteeredVehicle from "../assets/ts/SteeredVehicle";
import Vector2D from "../assets/ts/Vector2D";

@Component({})
export default class CanvasContainer extends Vue {
    private domElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private width: number = 1;
    private height: number = 1;
    private scale: number = 1;
    private canvasScale: number;
    $refs!: {
        canvas: HTMLCanvasElement;
        canvasContainer: HTMLElement;
    };

    mounted() {
        const container = this.$el;
        this.width = container.clientWidth * this.scale;
        this.height = container.clientHeight * this.scale;
        this.domElement = this.$refs.canvas;
        this.context = this.domElement.getContext('2d');
    }

    init() {

    }

    clearCanvas() {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;

        // context.clearRect(0, 0, cw, ch);
        context.save();
        context.fillStyle = 'rgba(0, 0, 0, 0.2)';
        context.beginPath();
        context.rect(0, 0, cw, ch);
        context.closePath();
        context.fill();
        context.restore();
    }

    drawVehicles(vehicles: SteeredVehicle[], color: string = '#fff') {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;
        const scale = this.scale;

        context.save();
        context.fillStyle = color;

        vehicles.forEach((vehicle, i) => {
            const position = vehicle.position.multiply(cw);
            context.save();
            // context.rotate(vehicle.velocity.angle);

            // context.beginPath();
            // context.rect(position.x, position.y, 1, 1);
            context.beginPath();
            // context.arc(0, 0, 8, 0, Math.PI * 2);
            context.arc(position.x, position.y, 2, 0, Math.PI * 2);
            // context.moveTo(0.05 * scale, 0);
            // context.lineTo(-0.05 * scale, 0.02 * scale);
            // context.lineTo(-0.05 * scale, -0.02 * scale);
            context.closePath();
            context.fill();
            context.restore();
        });

        context.restore();
    }

    onClick(e) {
        const scale: number = this.scale;
        const pos = new Vector2D(e.offsetX / this.width, e.offsetY / this.height).multiply(scale);
        console.log(pos);
        // this.$forceUpdate();
        this.$emit('click', pos);
    }
}
</script>

<style scoped>

</style>