
<template>
  <v-layout class="hero">
    <v-container class="hero-container main-container">
      <v-layout d-flex row wrap align-center="" justify-center="">
        <div class="text-center">
          <span class="display-1 white--text">EasyConfig</span> <br>
          <span class="white--text">Welcome To AMPLECOIN</span>
        </div>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
  export default {
    name: 'top-hero'
  }
</script>
<style scoped>
  .hero {
    background: linear-gradient(125deg, rgba(0, 153, 99, 0.99) 0, #0a69e6 100%) !important;
  }
  .hero-container {
    margin-top: 150px;
    margin-bottom: 150px;
    /*padding: 50px;*/
  }
  h1 {
    font-weight: 300;
    color: #212325;
  }
</style>
