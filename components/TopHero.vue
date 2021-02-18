
<template>
  <v-layout class="hero">

    <v-container class="hero-container main-container">
      <v-layout d-flex row wrap align-center="" justify-center="">
        <div class="text-center">
          <p class="display-1 white--text">The Truth Club</p>
          <p class="white--text mt-1">Give Help to take help.</p>
          <v-btn rounded large color="orange" dark class="mt-3" to="/auth/signup">Register Now</v-btn>
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
    background-image: url("../assets/images/top-bg.jpg");
    background-size: cover;
  }
  .hero-container {
    margin-top: 180px;
    margin-bottom: 180px;
    /*padding: 50px;*/
  }
  h1 {
    font-weight: 300;
    color: #212325;
  }
</style>
