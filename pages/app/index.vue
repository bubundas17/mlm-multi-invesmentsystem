<template>
  <v-layout row wrap class="ma-2">

    <v-flex xs12 v-if="!user.emailVerified">
      <v-alert type="error" prominent>
        <v-row align="center">
          <v-col>Verify Your Email</v-col>
          <v-col class="shrink">
            <v-btn @click="resendVerifyMail">Send Verification Link</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-flex>

    <v-flex xs12 v-if="!user.kycVerified">
      <v-alert type="error" prominent>
        <v-row align="center">
          <v-col>Complete Your KYC. To start Using this platform</v-col>
          <v-col class="shrink">
            <v-btn to="/app/kyc">Submit KYC</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-flex>

    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 red">
        <v-responsive aspect-ratio="4" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-center">Your Username : {{ user.username }} </div>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 teal">
        <v-responsive aspect-ratio="4" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-center">Wallet Balance : {{ Number(user.balance).toFixed(2) }} INR </div>
        </v-responsive>
      </v-card>
    </v-flex>


    <v-flex xs12>
      <div class="d-flex justify-center">
        <div class="text-center">
          <v-layout class="ma-2 app-grid" v-for="i in apps" :key="i.to">
            <nuxt-link :to="i.to" >
              <div class="app-item deep-purple darken-2 white--text">
                <v-icon style="font-size: 70px"  color="white" class="mt-6">{{ i.icon }}</v-icon>
                <br>
                <h3 class="mt-3">
                  {{ i.name }}
                </h3>
              </div>
            </nuxt-link>

          </v-layout>
        </div>
      </div>

    </v-flex>

  </v-layout>
</template>

<script>
export default {
  name: "index",
  layout: "dashboard",
  async asyncData({app}) {
    let licenses = await app.$axios.$get("/");
    return {
      licenses: licenses.licenseCount || 0
    }
  },
  data() {
    return {
      apps: [
        {icon: "mdi-account-circle", name: "Account", to: "/profile"},
        {icon: "mdi-wallet", name: "Wallet", to: "/app/wallet"},
        {icon: "mdi-cash-multiple", name: "Withdrawal", to: "/app/wallet/withdrawal"},
        {icon: "mdi-share-all", name: "Refer & earn", to: "/app/refer"},
        {icon: "mdi-gift-outline", name: "Donate", to: "/app/investments/new"},
        {icon: "mdi-atom-variant", name: "Spins", to: "/app/investments"},
        {icon: "mdi-wallet-giftcard", name: "Redeem", to: "/app/investments/redeem"},
        {icon: "mdi-view-list", name: "Transactions", to: "/app/invoice"},
        {icon: "mdi-face-agent", name: "Support", to: "/app/support"},
      ]
    }
  },
  methods: {
    resendVerifyMail() {
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
.app-grid {
  /*float: left;*/
  text-align: center;
  display: inline-block;
}

.app-item {
  background: white;
  margin: 10px;
  width: 150px;
  height: 150px;
  border-radius: 5px;
  -webkit-box-shadow: 3px 3px 9px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 3px 3px 9px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 3px 3px 9px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
}
a{
  text-decoration: none;
}
</style>
