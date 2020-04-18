<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>Pending Kyc Requests</v-card-title>
        <v-card-text>
<!--          {{ kycs }}-->

          <v-data-table
            :headers="headers"
            :items="kycs"
            :search="search"
          >

            <template v-slot:item._id="{ item }">
              <v-btn rounded class="primary" :to="`/app/kyc-req/${item._id}`"><v-icon left>mdi-eye</v-icon>View</v-btn>
            </template>

          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app}) {
      let kycs = await  app.$axios.$get("/kyc/pending");
      return {
        kycs: kycs.kycs
      }
    },
    data(){
      return {
        search: "",
        headers: [
          {
            text: 'Name',
            align: 'center',
            sortable: false,
            value: 'user.name',
          }, {
            text: 'Username',
            align: 'center',
            sortable: false,
            value: 'user.username',
          }, {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: '_id',
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
