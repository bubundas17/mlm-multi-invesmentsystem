<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>All Kyc Requests</v-card-title>
        <v-card-text>
<!--          {{ kycs }}-->

          <v-data-table
            :headers="headers"
            :items="kycs"
            :search="search"
          >

<!--            <template v-slot:item._id="{ item }">-->
<!--              <v-btn rounded class="primary" :to="`/app/kyc-req/${item._id}`">-->
<!--                <v-icon left>mdi-eye</v-icon>-->
<!--                View-->
<!--              </v-btn>-->
<!--            </template>-->

            <template v-slot:item.verified="{ item }">
              <v-checkbox v-model="item.verified" disabled class="d-flex justify-center"></v-checkbox>
            </template>

            <template v-slot:item.declined="{ item }">
              <v-checkbox v-model="item.declined" disabled class="d-flex justify-center"></v-checkbox>
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
      let kycs = await app.$axios.$get("/kyc");
      return {
        kycs: kycs.kycs
      }
    },
    data() {
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
            text: 'Verified?',
            align: 'center',
            sortable: true,
            value: 'verified',
          }, {
            text: 'Declined?',
            align: 'center',
            sortable: true,
            value: 'declined',
          },
          // {
          //   text: 'Actions',
          //   align: 'center',
          //   sortable: false,
          //   value: '_id',
          // },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
