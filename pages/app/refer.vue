<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>
          Refer And Earn
        </v-card-title>
        <v-card-text>
          <h3 class="sub-header">Your Referral Code:</h3>
          <span class="grey darken-5 ma-3 pa-6 text-center d-block white--text">
            {{ user.username }}
          </span>
          <v-text-field label="Referral Link" :value="referralLink">

          </v-text-field>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs4>
      <v-card class="ma-2">
        <v-card-title>Total Referred</v-card-title>
        <v-card-text>
          {{ ref.total }}
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card class="ma-2">
        <v-card-title>Pending</v-card-title>
        <v-card-text>
          {{ ref.pending }}
        </v-card-text>
      </v-card>

    </v-flex>
    <v-flex xs4>
      <v-card class="ma-2">
        <v-card-title>Completed</v-card-title>
        <v-card-text>
          {{ ref.completed }}
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
      let ref = await app.$axios.$get("/refer");
      return {
        ref
      }
    },
    computed: {
      referralLink(){
        if(process.browser) {
          return `https://${window.location.hostname}/auth/signup?ref=${this.user.username}`
        } else  {
          return ""
        }
      }
    }
  }
</script>

<style scoped>

</style>
