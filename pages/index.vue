<template>
  <v-layout
    column
  >
  <top-hero/>

  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import TopHero from "../components/TopHero";

export default {
  components: {
    TopHero,
    Logo,
    VuetifyLogo
  }
}
</script>
