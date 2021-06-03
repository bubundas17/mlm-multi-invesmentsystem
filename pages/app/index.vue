<template>
  <v-layout row wrap class="ma-2">

    <v-dialog v-model="settings.popup.enabled" persistent>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="settings.popup.enabled = false" color="secondary" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text class="text-center title" v-html="settings.popup.text"></v-card-text>
      </v-card>
    </v-dialog>

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


    // <v-flex xs12 sm12 md6>
    //   <v-card class="ma-2">
    //     <v-card-title>Resent Donates</v-card-title>
    //     <v-list dense style="max-height: 150px; overflow: auto">
    //       <v-list-item v-for="item in index.investments" :key="item._id">
    //         <v-list-item-content>
    //           <v-list-item-title>{{ item.user.name }}</v-list-item-title>
    //           <v-list-item-subtitle>{{ item.created | fromNow}}</v-list-item-subtitle>
    //         </v-list-item-content>
    //         <v-list-item-action>₹{{ item.amount }}</v-list-item-action>
    //       </v-list-item>
    //     </v-list>
    //   </v-card>
    // </v-flex>

    // <v-flex xs12 sm12 md6>
    //   <v-card class="ma-2">
    //     <v-card-title>Resent Helps</v-card-title>
    //     <v-list dense style="max-height: 150px; overflow: auto">
    //       <v-list-item v-for="item in index.withdrawal" :key="item._id">
    //         <v-list-item-content>
    //           <v-list-item-title>{{ item.user.name }}</v-list-item-title>
    //         </v-list-item-content>
    //         <v-list-item-action>₹{{ item.amount }}</v-list-item-action>
    //       </v-list-item>
    //     </v-list>
    //   </v-card>
    // </v-flex>
    <v-flex xs12>
      <v-card class="ma-2 teal wallet-bgggg">
        <v-responsive aspect-ratio="8" style="min-height: 100px" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">Global Wallet</span><br>
            <v-icon color="white" large left class="mt-n1">mdi-wallet</v-icon>
            {{ index.globalwallet.balance }} INR
          </div>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 red profile-bg">
        <v-responsive aspect-ratio="4" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">Username</span><br>
            {{ user.username }}
          </div>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 teal wallet-bg">
        <v-responsive aspect-ratio="4" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">Wallet</span><br>
            {{ Number(user.balance).toFixed(2) }} INR
          </div>
        </v-responsive>
      </v-card>
    </v-flex>


    <v-flex xs12>
      <div class="d-flex justify-center">
        <div class="text-center">
          <v-layout class="ma-2 app-grid" v-for="i in apps" :key="i.to">
            <nuxt-link :to="i.to">
              <div class="app-item deep-purple darken-2 white--text">
                <v-icon style="font-size: 70px" color="white" class="mt-6">{{ i.icon }}</v-icon>
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
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 red wallet-bggg">
        <v-responsive aspect-ratio="4" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">Total Referral Earning</span><br>
            {{ Number(user.totalRefBonus).toFixed(2) }} INR
          </div>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 teal wallet-bgg">
        <v-responsive aspect-ratio="4" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">Refer Balance</span><br>
            {{ Number(user.refBalance).toFixed(2) }} INR
          </div>
        </v-responsive>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card class="ma-2 red profile-bgma">
        <v-responsive aspect-ratio="8" style="min-height: 100px" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">Max Allowed Refer</span><br>
            {{ Number(user.maxRefBonus).toFixed(2) }} INR
          </div>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 teal walle-bggggg">
        <v-responsive aspect-ratio="4" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">All Completed Refer</span><br>
            <v-icon color="white" large left class="mt-n1">mdi-account</v-icon>
            {{ allCompleted }}
          </div>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-card class="ma-2 teal walle-bgggg">
        <v-responsive aspect-ratio="4" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">Pending Refer</span><br>
            <v-icon color="white" large left class="mt-n1">mdi-account</v-icon>
            {{ ref.pending }}
          </div>
        </v-responsive>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="ma-2 teal wallet-bgggg">
        <v-responsive aspect-ratio="8" style="min-height: 100px" class="d-flex justify-center align-center">
          <div class="display-1 white--text text-left px-6">
            <span class="headline">Total Referred</span><br>
            <v-icon color="white" large left class="mt-n1">mdi-account</v-icon>
            {{ ref.total }}
          </div>
        </v-responsive>
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
    let index = await app.$axios.$get("/");
    let settings = await app.$axios.$get("/settings/other")

    return {
      ref,
      settings,
      index
    }
  },
  data() {
    return {
      settings: {
        popup: {
          enabled: false,
          text: ""
        },
        promotion: {
          bonus: "",
          future: ""
        },
        zodiac: {
          aries: "",
          taurus: "",
          gemini: "",
          cancer: "",
          leo: "",
          virgo: "",
          libra: "",
          scorpio: "",
          sagittarius: "",
          capricorn: "",
          aquarius: "",
          pisces: "",
        }
      },
      apps: [
        {icon: "mdi-account-circle", name: "Account", to: "/profile"},
        {icon: "mdi-wallet", name: "Wallet", to: "/app/wallet"},
        {icon: "mdi-cash-multiple", name: "Withdrawal", to: "/app/wallet/withdrawal"},
        {icon: "mdi-share-all", name: "Refer & earn", to: "/app/refer"},
        {icon: "mdi-gift-outline", name: "Donate", to: "/app/investments/new"},
        {icon: "mdi-atom-variant", name: "Wheel Of Luck", to: "/app/investments"},
        {icon: "mdi-wallet-giftcard", name: "Redeem", to: "/app/investments/redeem"},
        {icon: "mdi-view-list", name: "Transactions", to: "/app/invoice"},
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
  },
  computed: {
    allCompleted() {
      console.log(this.ref)
      return this.ref.completed
    }
  }
}
</script>

<style scoped>

.profile-bg {
  background-size: cover;
  background-image: url("/images/username-bg.jpg");
}

.profile-bgma {
  background-size: cover;
  background-image: url("/images/manr.jpg");
}

.wallet-bg {
  background-size: cover;
  background-image: url("/images/wallet.jpg");
}

.wallet-bgg {
  background-size: cover;
  background-image: url("/images/tre.jpg");
}

.wallet-bggg {
  background-size: cover;
  background-image: url("/images/ref.jpg");
}

.wallet-bgggg {
  background-size: cover;
  background-image: url("/images/refer112.jpg");
}

.walle-bgggg {
  background-size: cover;
  background-image: url("/images/acr.jpg");
}

.walle-bggggg {
  background-size: cover;
  background-image: url("/images/lcr.jpg");
}


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

a {
  text-decoration: none;
}
</style>
