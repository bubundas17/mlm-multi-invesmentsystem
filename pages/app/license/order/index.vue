<template>
  <v-layout column wrap>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">Order License</v-card-title>
      <v-list>
        <v-list-item v-for="item in licenseTypes" :key="item._id"  :to="`/app/license/order/${item._id}`">
          <v-list-item-content>{{ item.name }} - ${{ calculatePrice(item.amount) }}/m</v-list-item-content>
          <v-list-item-action><v-btn icon class="primary white--text" :to="`/app/license/order/${item._id}`"><v-icon>mdi-cart</v-icon></v-btn></v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app}){
      let licenses = await app.$axios.$get("/license-types");
      return {
        licenseTypes: licenses.licenseTypes
      }
    },
    data(){
      return {
        licenseTypes: []
      }
    }
  }
</script>

<style scoped>

</style>
