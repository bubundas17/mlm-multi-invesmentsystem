<template>
  <v-layout column wrap>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">Invoice Details</v-card-title>
      <v-card-text>
        <h2 class="subtitle mt-3">{{invoice.title}}</h2>
        <p class="body-1 mt-4"> {{ invoice.description }} </p>
      </v-card-text>
      <v-list>
        <v-divider/>
        <v-list-item>
        Total: {{ invoice.finalAmount }} AMP
      </v-list-item>
        <v-divider/>
        <v-list-item>
        Date: {{ formatData(invoice.date) }}
      </v-list-item>
      </v-list>
      <v-divider/>

<!--      <v-card-text>-->
<!--        <h2 class="subtitle">Items:</h2>-->
<!--        <v-list>-->
<!--          <v-list-item v-for="item in invoice.items" :key="item._id">-->
<!--            <v-list-item-content>{{ item.name }}</v-list-item-content> <v-list-item-action> ${{ item.amount }}</v-list-item-action>-->
<!--          </v-list-item>-->
<!--        </v-list>-->
<!--      </v-card-text>-->

    </v-card>
  </v-layout>
</template>

<script>
  const moment = require("moment");
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app, route}){
      let invoices = await app.$axios.$get("/invoices/" + route.params.id);
      return  {
        invoice: invoices.invoice
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
