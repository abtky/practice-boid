<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Matter from 'matter-js';
import MatterWorld from '../assets/scripts/matter/MatterWorld';

@Component
export default class MatterComponent extends Vue {
  $refs!: {
    container: HTMLElement;
  };
  circle: Matter.Circle;
  composite: Matter.Composite;
  timerId: number = 0;
  frameCount: number = 0;
  world: MatterWorld;
  mounted() {
    console.log('matter.mounted', Matter);
    const container: HTMLElement = this.$refs.container;
    this.world = new MatterWorld(container);
    // const engine: Matter.Engine = Matter.Engine.create();
    const renderOption: {} = {

    }
    const render: Matter.Render = Matter.Render.create({
      element: container,
      engine: this.world.getEngine()
    });
    this.circle = Matter.Bodies.circle(175, -400, 20, {
      //バウンドさせたい場合はrestitutionに任意の値を渡す
      restitution: .5
    });
    const rect = Matter.Bodies.rectangle(180, 100, 30, 40, {
      //バウンドさせたい場合はrestitutionに任意の値を渡す
      restitution: .5
    });
    Matter.Body.rotate(rect, 45 * Math.PI / 180);
    console.log('circle', this.circle);

    this.world.add(this.circle);
    this.world.add(rect);
    this.world.run();
    console.log(this.world);
    // Matter.Engine.run(engine);
    Matter.Render.run(render);
    this.play();
  }
  play() {
      this.frameCount = 0;
      this.loop();
  }
  loop() {
      cancelAnimationFrame(this.timerId);
    //   console.log(this.circle.position);
      this.timerId = requestAnimationFrame(() => {
          this.frameCount += 1;
          if (this.frameCount > 200) {
              // Matter.Composite.remove(this.composite, this.circle);
          }
          this.loop();
      });
  }
}
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
