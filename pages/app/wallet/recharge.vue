<template>
  <v-layout column wrap>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">Recharge Wallet</v-card-title>
      <v-card-text>
        <p>        As of now the only way to recharge the wallet it to get a recharge voucher code from one of our vendors.
          We have given a list of official vendors.</p>

      </v-card-text>
    </v-card>
    <v-layout row wrap class="ma-1">
      <v-flex xs12 md4>
        <v-card class="ma-2">
          <v-card-title class="secondary white--text">Selly.gg</v-card-title>
          <v-card-text class="pt-2">
            <p class="body-1">
              Visit Our Selly Store any buy Redeem Vouchers. You'll get official support from this.
            </p>
          </v-card-text>
          <v-list dense>
            <v-divider></v-divider>
            <v-list-item>Official Support: YES</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Transaction Speed: Instant</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Payment: PayPal, BTC, ETH, LTC</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Min Amount: $5</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Code Validity: 1yr</v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-card-actions>
            <v-btn block text color="primary">Selly Store</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md4>
        <v-card class="ma-2">
          <v-card-title class="secondary white--text">Shoppy.gg</v-card-title>
          <v-card-text class="pt-2">
            <p class="body-1">
              Visit Our Shoppy Store any buy Redeem Vouchers. You'll get official support from this.
            </p>
          </v-card-text>
          <v-list dense>
            <v-divider></v-divider>
            <v-list-item>Official Support: YES</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Transaction Speed: Instant</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Payment: PayPal, BTC, ETH, LTC</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Min Amount: $5</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Code Validity: 1yr</v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-card-actions>
            <v-btn block text color="primary">Shoppy Store</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="ma-2">
          <v-card-title class="secondary white--text">Telegram</v-card-title>
          <v-card-text class="pt-2">
            <p class="body-1">
              Visit Our Shoppy Store any buy Redeem Vouchers. You'll get official support from this.
            </p>
          </v-card-text>
          <v-list dense>
            <v-divider></v-divider>
            <v-list-item>Official Support: YES</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Transaction Speed: Instant</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Payment: UPI, PayTM, Any Other</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Min Amount: $2</v-list-item>
            <v-divider></v-divider>
            <v-list-item>Code Validity: 1yr</v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-card-actions>
            <v-btn block text color="primary">Shoppy Store</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <p class="body-1 ma-2">Note: Charge back without a valid reason will cause permanent ban.</p>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard"
  }
</script>

<style scoped>

</style>
