<template>
  <div class="container" ref="container">
    <canvas ref="matterCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Matter from 'matter-js';
import MatterWorld from '../assets/scripts/matter/MatterWorld';
import MatterBody from '../assets/scripts/matter/MatterBody';
import MatterRender from '../assets/scripts/matter/MatterRender';

@Component
export default class MatterComponent extends Vue {
  $refs!: {
    container: HTMLElement;
    matterCanvas: HTMLCanvasElement;
  };
  timerId: number = 0;
  frameId: number = 0;
  frameCount: number = 0;
  world!: MatterWorld;
  render!: MatterRender;
  async mounted() {
    console.log('matter.mounted', Matter);
    const images: string[] = [
      '../images/matter/obj_cheese1.png',
      '../images/matter/obj_cheese2.png',
      '../images/matter/obj_mouse1.png',
      '../images/matter/obj_mouse2.png'
    ];
    MatterBody.initResources(images);
    await this.$nextTick();
    const container: HTMLElement = this.$refs.container;
    this.world = new MatterWorld(container);
    this.render = new MatterRender(this.world, this.$refs.matterCanvas);
    const renderOption: Matter.IRenderDefinition = {
      element: container,
      engine: this.world.getEngine()
    }
    const render: Matter.Render = Matter.Render.create(renderOption);
    render.canvas.width = container.offsetWidth;
    render.canvas.height = container.offsetHeight;
    // Matter.Render.run(render);
    this.play();
  }
  play() {
      this.frameCount = 0;
      this.addBody();
      this.loop();
  }
  loop() {
      cancelAnimationFrame(this.frameId);
      this.frameId = requestAnimationFrame(() => {
          // this.world.update();
          this.render.update();
          this.loop();
      });
  }
  createCircle() {
    const worldSize: {width: number, height: number} = this.world.getSize();
    const x: number = Math.random() * worldSize.width;
    const y: number = -50;
    const radius: number = 20;
    const circle: Matter.Body =  Matter.Bodies.circle(x, y, radius, {
      //バウンドさせたい場合はrestitutionに任意の値を渡す
      restitution: .7,
      mass: 0.1
    });
    const vx: number = ( Math.random() - .5 ) * 2;
    Matter.Body.setVelocity(circle, {x: vx, y: 0});
    return circle;
  }
  createRect() {
    const worldSize: {width: number, height: number} = this.world.getSize();
    const x: number = Math.random() * worldSize.width;
    const y: number = -50;
    const rotate: number = Math.random() * Math.PI * 2;
    const rect = Matter.Bodies.rectangle(180, 100, 30, 40, {
      //バウンドさせたい場合はrestitutionに任意の値を渡す
      restitution: .9,
      mass: .4
    });
    Matter.Body.rotate(rect, rotate);
    return rect;
  }
  addBody() {
      clearTimeout(this.timerId);
      const interval: number = Math.random() * 200 + 200;
      // const interval: number = Math.random() * 100;
      /*
      const isRect: boolean = Math.random() < 0.2;
      const body: Matter.Body = isRect ? this.createRect() : this.createCircle();
      this.world.add(body);
      */
     this.render.addBody();
      this.timerId = setTimeout(() => {
          this.addBody();
      }, interval);
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
