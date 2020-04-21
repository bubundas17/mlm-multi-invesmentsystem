<template>
  <v-layout
    column
  >
  <top-hero/>
    <vision></vision>
    <we-are-paying-you-back-technically/>
    <AwesomeTeam></AwesomeTeam>
    <Exchanges/>
    <WeArePayingBackBlockchain/>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import TopHero from "../components/TopHero";
import WeArePayingYouBackTechnically from "../components/banners/WeArePayingYouBackTechnically";
import AwesomeTeam from "../components/banners/AwsomeTeam";
import Vision from "../components/banners/Vision";
import Exchanges from "../components/banners/Exchanges";
import WeArePayingBackBlockchain from "../components/banners/WeArePayingBackBlockchain";

export default {
  components: {
    WeArePayingBackBlockchain,
    Exchanges,
    Vision,
    AwesomeTeam,
    WeArePayingYouBackTechnically,
    TopHero,
    Logo,
    VuetifyLogo
  }
}
</script>
