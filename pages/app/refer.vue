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
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>Refer Stats
          <v-spacer/>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                :loading="transferLoading"
                :disabled="transferLoading"
                @click="openTransferDialog"
              >
                Transfer To Wallet
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                Use Google's location service?
              </v-card-title>
              <v-card-text>Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Disagree
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Agree
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-text>
          <p class="body-2">Max Allowed Refer Earning: {{ this.user.maxRefBonus }} INR</p>
          <p class="body-2">Total Refer Earning: {{ this.user.totalRefBonus }} INR</p>
          <p class="body-2">Available Balance: {{ this.user.refBalance }} INR</p>
        </v-card-text>
      </v-card>

    </v-flex>
    <v-layout column>
      <v-card class="ma-2">
        <h4 class=" ma-2 mb-n1">Select Level</h4>
        <v-select label="Select Level" solo flat class="mb-n7" :items="lavels" v-model="lavel"></v-select>
        <v-divider></v-divider>
        <v-card-actions>
        </v-card-actions>
        <v-data-table
          :headers="headers"
          :items="currentRefList"
          :items-per-page="5"
          class="elevation-0"
        >

          <template v-slot:item.isActive="{ item }">
            <v-simple-checkbox
              v-model="item.isActive"
              disabled
            ></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>


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
  data() {
    return {
      dialog: false,
      lavels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      lavel: 1,
      transferLoading: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Username',
          align: 'center',
          sortable: false,
          value: 'username',
        },
        {text: 'Is Active', sortable: false, align: 'right', value: 'isActive'},
      ]
    }
  },
  computed: {
    referralLink() {
      if (process.browser) {
        return `https://${window.location.hostname}/auth/signup?ref=${this.user.username}`
      } else {
        return ""
      }
    },
    currentRefList() {
      let users = this.ref.users;
      users = users.filter(user => {
        return user.uptree.indexOf(this.user._id) === this.lavel - 1;
      })
      return users;
    }
  },
  methods: {
    async openTransferDialog() {
      console.log("on openTransferDialog")
      this.lavel = 1;
      let refs = this.currentRefList;
      let active = refs.filter(ref => ref.isActive)
      // console.log(active)
      if (active.length < 3) {
        this.showAlert("error", "You need at lest 3 Active Users in Level 1 to transfer to wallet")
        return
      }
      if (this.user.refBalance < 10) {
        this.showAlert("error", "At least 10INR needed to transfer.")
        return
      }
      this.transferLoading = true;
      await this.$axios.$post("/refer/transfer")
      this.transferLoading = false;
      this.$store.dispatch("refreshUser");
      this.showAlert("success", "All funds transferred to main wallet.")
    }
  }

}
</script>

<style scoped>

</style>
