<template>
  <v-layout column>
  <v-card class="ma-2">
    <v-card-text>
      <v-img :src="settings.promotion.bonus"></v-img>
    </v-card-text>
  </v-card>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app}) {
      try {
        let settings = await app.$axios.$get("/settings/other")
        return {settings}
      } catch (e) {
        return {}
      }
    },
    data() {
      return {
        settings: {
          popup: {
            enabled: false,
            text: ""
          },
          promotion: {
            bonus: "",
            future: ""
          },
          zodiac: {
            aries: "",
            taurus: "",
            gemini: "",
            cancer: "",
            leo: "",
            virgo: "",
            libra: "",
            scorpio: "",
            sagittarius: "",
            capricorn: "",
            aquarius: "",
            pisces: "",
          }
        }
      }
    },
  }
</script>

<style scoped>

</style>
