<template>
  <div class="canvasContainer">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';

@Component
export default class CanvasContainer extends Vue {
    protected domElement: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    protected width: number = 1;
    protected height: number = 1;
    protected scale: number = 1;
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

    onResize() {
        const container = this.$el;
        this.width = container.clientWidth * this.scale;
        this.height = container.clientHeight * this.scale;
        this.domElement = this.$refs.canvas;
        this.context = this.domElement.getContext('2d');
    }
}
</script>

<style scoped>
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