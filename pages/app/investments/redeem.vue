<template>
  <v-layout column wrap class="grey darken-4 justify-center align-center" style="height: 100%">
    <v-card class="ma-2 mt-9" min-width="300px" width="500px">
      <v-card-title class="secondary white--text floating-title">Redeem Code</v-card-title>
      <v-card-text>
        <v-text-field  v-model="voucher" label="Enter Voucher Code"/>
      </v-card-text>
      <v-card-actions>
        <v-btn block class="primary" @loading="this.loading" @click="redeemCode">Redeem Code</v-btn>
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
        voucher: "",
        loading: false
      }
    },
    methods: {
      redeemCode() {
        this.loading = true

        this.$axios.$post("/investments/redeem", {voucher: this.voucher})
          .then(data => {
            console.log(data)
            this.showAlert("success", "Voucher Redeemed.")
            this.$store.dispatch("refreshUser")
            this.voucher = ""
          }).catch(err => {
            console.log(err)
            this.showAlert("error", "Invalid Voucher.")
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
