<template>
  <div class="container">
    <physics-renderer ref="canvas"></physics-renderer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import PhysicsRenderer from '../components/physics/PhysicsRenderer';
import PhysicsBall from '../assets/scripts/physics/PhysicsBall';

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
    timerId: number = 0;
    previousTime: number;
    async mounted() {
        await this.$nextTick();
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

        this.eulerBall.update(elapsedTime);
        this.$refs.canvas.clearCanvas();
        this.$refs.canvas.drawBall(this.eulerBall);
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
