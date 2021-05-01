<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>
          KYC Details
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              Name: {{ kyc.user.name }}
            </v-list-item>
            <v-list-item>
              Username: {{ kyc.user.username }}
            </v-list-item>
            <v-list-item>
              Email: {{ kyc.user.email }}
            </v-list-item>
            <v-list-item>
              Phone: {{ kyc.user.phone }}
            </v-list-item>
            <v-list-item>
              Aadhaar Number: {{ kyc.user.aadhaar }}
            </v-list-item>
          </v-list>

          <h2 class="sub-header">Submitted Aadhaar Image</h2>
          <div >
            <v-img :src="`/api/v1/kyc/uploads/${kyc.filename}-1.jpg`" max-width="50%"> </v-img>
            <v-img :src="`/api/v1/kyc/uploads/${kyc.filename}-2.jpg`" max-width="50%"> </v-img>
          </div>

          <p class="ma-2">
            <a :href="`/api/v1/kyc/uploads/${kyc.filename}-1.jpg`" :download="kyc.filename + `-1.jpg`">Download Image 1</a>
            <br>
            <a :href="`/api/v1/kyc/uploads/${kyc.filename}-2.jpg`" :download="kyc.filename + `-2.jpg`">Download Image 2</a>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer>
          </v-spacer>
          <v-btn class="secondary" @click="reject">Reject</v-btn>
          <v-btn class="primary" @click="accept">Accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app, route}) {
      let kyc = await  app.$axios.$get("/kyc/" + route.params.id);
      return {
        kyc: kyc.kyc
      }
    },
    methods: {
      async accept(){
        await this.$axios.$post(`/kyc/${this.$route.params.id}/accept`);
        this.showAlert("success", "Set As Verified!");
        this.$router.push("/app/kyc-req/pending");
      },
      async reject(){
        await this.$axios.$post(`/kyc/${this.$route.params.id}/reject`);
        this.showAlert("info", "Set As Rejected!");
        this.$router.push("/app/kyc-req/pending");
      }
    }
  }
</script>

<style scoped>

</style>
