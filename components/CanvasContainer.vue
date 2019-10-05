<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height" @click="onClick"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import SteeredVehicle from "../assets/ts/SteeredVehicle";
import Vector2D from "../assets/ts/Vector2D";
import Vehicle from "../assets/ts/Vehicle";

@Component({})
export default class CanvasContainer extends Vue {
    private domElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private width: number = 1;
    private height: number = 1;
    private scale: number = 0.5;
    private canvasScale: number;
    $refs!: {
        canvas: HTMLCanvasElement;
        canvasContainer: HTMLElement;
    };

    mounted() {
        window.addEventListener('resize', () => {
            this.onResize();
        });
        this.onResize();
    }

    get aspectRatio() {
        return this.height / this.width;
    }

    clearCanvas() {
        const canvas = this.domElement;
        const cw = canvas.width;
        const ch = canvas.height;
        const context = this.context;

        context.save();
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
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
            this.edgeBehavior(vehicle);
            const position = vehicle.position.multiply(cw);
            context.save();
            context.beginPath();
            context.arc(position.x, position.y, 0.5, 0, Math.PI * 2);
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
        // this.$emit('click', pos);
    }

    onResize() {
        const container = this.$el;
        this.width = container.clientWidth * this.scale;
        this.height = container.clientHeight * this.scale;
        this.domElement = this.$refs.canvas;
        this.context = this.domElement.getContext('2d');
    }

    /**
     * vehicleの座標が画面外へ出てしまった際の処理
     * @param vehicle
     */
    edgeBehavior(vehicle: Vehicle) {
        const aspectRatio: number = this.aspectRatio;
        while(vehicle.position.x < 0) {
            vehicle.position.x += 1;
        }
        while(vehicle.position.x > 1) {
            vehicle.position.x -= 1;
        }
        while(vehicle.position.y < 0) {
            vehicle.position.y += aspectRatio;
        }
        while(vehicle.position.y > aspectRatio) {
            vehicle.position.y -= aspectRatio;
        }
    }
}
</script>

<style scoped>

</style>