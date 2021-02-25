<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>Pending Withdrawal Requests</v-card-title>
        <v-card-text>
          <!--          {{ kycs }}-->

          <v-data-table
            :headers="headers"
            :items="withdrawals"
            :search="search"
          >

            <template v-slot:item._id="{ item }">
              <v-btn rounded class="primary" :to="`/app/withdrawal-req/${item._id}`"><v-icon left>mdi-eye</v-icon>View</v-btn>
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
    let kycs = await  app.$axios.$get("/withdrawal/all");
    return {
      withdrawals: kycs.withdrawal
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
          text: 'Amount',
          align: 'center',
          sortable: false,
          value: 'amount',
        }, {
          text: 'Status',
          align: 'center',
          sortable: false,
          value: 'status',
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
