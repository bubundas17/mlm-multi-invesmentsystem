<template>
  <v-layout column wrap>
   <v-card class="ma-2">
     <v-card-title class="secondary white--text">All Licenses</v-card-title>
     <v-list>
       <v-list-item v-for="license in licenses" :key="license._id" :to="`/app/license/${license._id}`" >
         <v-list-item-content>
           <v-list-item-title>{{ license.licenseType.name }} - ({{ license.serverIP || license.domainName }})</v-list-item-title>
           <v-list-item-subtitle>Expires: {{ formatData(license.expires) }} | {{ license.status }} | ${{ calculatePrice(license.amount) }}/m</v-list-item-subtitle>
         </v-list-item-content>
         <v-list-item-action>
           <v-btn icon :to="`/app/license/${license._id}`"><v-icon>mdi-eye-circle-outline</v-icon></v-btn>
         </v-list-item-action>
       </v-list-item>
     </v-list>
   </v-card>
  </v-layout>
</template>

<script>
  const moment = require("moment");
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({ app }){
      let licenses = await app.$axios.$get("/licenses");
      return {
        licenses: licenses.licenses
      }
    },
    data(){
      return {
        licenses: []
      }
    },
    methods: {
      formatData(date) {
        return moment(date).format("MMM Do YYYY")
      }
    }
  }
</script>

<style scoped>

</style>
