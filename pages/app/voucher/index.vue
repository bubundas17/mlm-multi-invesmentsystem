<template>
  <v-layout column wrap>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text" >Create Vouchers</v-card-title>
      <v-card-text>
        <p class="body-1 mt-2">Create A Vouchers</p>
        <v-text-field label="Enter Amount in INR" type="number" v-model="amount"/>
      </v-card-text>
      <v-card-actions>
        <v-btn block dark class="primary" :loading="createVoucherLoading" @click="createVoucher">Create</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="ma-2">
      <v-card-title class="secondary white--text">Vouchers</v-card-title>
      <v-list dence>
        <v-list-item v-for="voucher in vouchers" :key="voucher._id">
          {{  voucher.code }} - Rs. {{ voucher.amount }} INR - {{ voucher.status }} -
          {{ voucher.createdBy ? voucher.createdBy.username : "??" }} - {{ voucher.usedBy ? voucher.usedBy.username : "??" }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>

  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app}){
      let vouchers = await app.$axios.$get("/vouchers/");
      return {
        vouchers: vouchers.vouchers
      }
    },
    data(){
      return {
        amount: 100,
        createVoucherLoading: false,
        vouchers: []
      }
    },
    methods: {
      async createVoucher() {
        this.createVoucherLoading =  true;
        this.$axios.$post("/vouchers/", {amount: this.amount}).then(data => {
          this.showAlert("success", "Voucher Code Created.");
          this.refreshVouchers()
        }).catch(_=> {
          this.showAlert("error", "Voucher Code Creation Failed.");
        }).finally(_=> {
          this.createVoucherLoading = false;
        })
      },
      async refreshVouchers(){
        this.$axios.$get("/vouchers/").then(data => {
          this.vouchers = data.vouchers
        })
      }
    }
  }
</script>

<style scoped>

</style>
