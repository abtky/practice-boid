<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height" @click="onClick"></canvas>
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

</style>