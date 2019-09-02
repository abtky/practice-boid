<template>
  <div class="VueToNuxtLogo">
    <p class="message">{{customMessage}}</p>
    <ul v-if="hasItems">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Service from '../assets/ts/Service';

@Component({})
export default class Logo extends Vue {
  private message: string = 'message';
  private items: any[] = [];
  async mounted() {
    this.message = 'new Message';
    this.items = await Service.fetch('/items');
    console.log('response', this.items);
  }
  get customMessage(): string {
    return 'Hello ' + this.message;
  }
  get hasItems() {
    return this.items.length > 0;
  }
};

</script>

<style lang="scss">
.VueToNuxtLogo {
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 245px;
  .message {
    color: #022;
    position: relative;
    z-index: 1;
  }
}
@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes godown {
  100% {
    top: 180px;
  }
}

@keyframes goright {
  100% {
    left: 70px;
  }
}
</style>
