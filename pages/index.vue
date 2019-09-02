<template>
  <div class="container">
    <h1 class="title">
      study_template??
    </h1>
    <logo />
  </div>
</template>

<script lang="ts">
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    color: #f00;
  }
}

</style>
