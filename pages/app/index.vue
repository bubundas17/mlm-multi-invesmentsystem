<template>
  <v-layout row wrap class="ma-2">

    <v-flex xs12 v-if="!user.emailVerified">
      <v-alert type="error" prominent>
        <v-row align="center" >
          <v-col >Verify Your Email</v-col>
          <v-col class="shrink">
            <v-btn @click="resendVerifyMail">Send Verification Link</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-flex>

    <v-flex xs12 v-if="!user.kycVerified">
      <v-alert type="error" prominent>
        <v-row align="center" >
          <v-col >Complete Your KYC. To start Using this platform</v-col>
          <v-col class="shrink">
            <v-btn to="/app/kyc">Submit KYC</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-flex>

    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 green">
        <v-responsive aspect-ratio="2.5" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-center">Your Username: {{ user.username }} </div>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 teal">
        <v-responsive aspect-ratio="2.5" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-center">Wallet: {{ Number(user.balance).toFixed(2) }} INR</div>
        </v-responsive>
      </v-card>
    </v-flex>

    <v-flex xs12 sm12 md6>
      <v-card class="ma-2">
        <v-card-title class="secondary white--text">NEWS</v-card-title>
        <v-list>
          <v-list-item>
            Test Message
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2">
        <v-card-title class="secondary white--text">EVENTS</v-card-title>
        <v-list>
          <v-list-item>
            Website Going live!
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>


  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app}){
      let licenses = await app.$axios.$get("/");
      return {
        licenses: licenses.licenseCount || 0
      }
    },
    methods: {
      resendVerifyMail(){
        this.$axios.$post("/auth/resend-verify-email").then(data => {
         this.showAlert("success", "Verify Mail Sent!");
        }).catch(err => {
          this.showAlert("error", "Failed to send verify mail.");
        })
      }
    }
  }
</script>

<style scoped>

</style>
