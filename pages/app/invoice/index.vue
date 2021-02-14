<template>
  <v-layout column wrap>
      <v-card class="ma-2 mt-9">
        <v-card-title class="secondary white--text floating-title">Transaction History</v-card-title>
        <v-list two-line>
          <v-list-item v-for="invoice in invoices" :key="invoice._id">
            <v-list-item-content>
              <v-list-item-title>
                {{ invoice.title }}
              </v-list-item-title>
              <v-list-item-subtitle>₹{{ invoice.finalAmount }} INR  {{ invoice.txnType }} | {{ formatData(invoice.date) }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon :to="`/app/invoice/${invoice._id}`"><v-icon>mdi-eye</v-icon></v-btn>
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
    async asyncData({app}) {
      let invoices = await app.$axios.$get("/invoices");
      return  {
        invoices: invoices.invoices
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
