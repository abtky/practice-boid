<template>
  <div class="container">
    <canvas-container></canvas-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import CanvasContainer from '../components/CanvasContainer';

@Component({
    components: {CanvasContainer}
})
class Physics extends Vue {
    head () {
        return {
            title: 'physics'
        }
    }
    $refs!: {

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
