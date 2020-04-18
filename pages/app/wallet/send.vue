<template>
  <v-layout column wrap>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">Send Ample Coins</v-card-title>
      <v-card-text>
        <v-text-field  v-model="username" label="Username"/>
        <v-text-field  v-model="amount" label="Amount">
          <template slot="append-outer">
            APC
          </template>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block class="primary" @loading="loading" @click="send">Send Now</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    data(){
      return {
        username: "",
        amount: 0,
        loading: false
      }
    },
    methods: {
      send() {
        this.loading = true;

        this.$axios.$post("/wallet/send", {username: this.username, amount: this.amount})
          .then(data => {
            console.log(data)
            this.showAlert("success", "Coins Sent!");
            this.$store.dispatch("refreshUser");
            this.voucher = ""
          }).catch(err => {
          console.log(err.response.data.message)
          this.showAlert("error", err.response.data.message)
        })
          .finally(_=> {
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>
