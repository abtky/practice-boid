<template>
  <div class="container">
    <physics-renderer ref="canvas"></physics-renderer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import PhysicsRenderer from '../components/physics/PhysicsRenderer';
import PhysicsBall from '../assets/scripts/physics/PhysicsBall';
import VarletPoint from '../components/physics/VarletPoint';

@Component({
    components: {PhysicsRenderer}
})
class Physics extends Vue {
    head () {
        return {
            title: 'physics'
        }
    }
    $refs!: {
        canvas: PhysicsRenderer
    };
    isPlay: boolean = false;
    eulerBall: PhysicsBall = new PhysicsBall();
    point: VarletPoint = new VarletPoint(10, 20);
    timerId: number = 0;
    previousTime: number;
    async mounted() {
        await this.$nextTick();
        this.point.vx = 8;
        this.point.vy = 10;
        this.play();
    }
    play() {
        this.previousTime = new Date().getTime();
        this.isPlay = true;
        this.timerId = requestAnimationFrame(() => {
            this.loop();
        });
    }
    pause() {
        this.isPlay = false;
    }
    loop() {
        cancelAnimationFrame(this.timerId);
        const now: number = new Date().getTime();
        const elapsedTime: number = ( now - this.previousTime ) / 1000;

        this.point.update();
        this.eulerBall.update(elapsedTime);
        this.$refs.canvas.clearCanvas();
        this.$refs.canvas.drawBall(this.eulerBall);
        this.$refs.canvas.drawPoint(this.point, 12);
        this.previousTime = now;
        this.timerId = requestAnimationFrame(() => {
            this.loop();
        });
    }
}
export default Physics;
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
