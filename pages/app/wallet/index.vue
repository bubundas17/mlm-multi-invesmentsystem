<template>
  <v-layout column>
    <v-card class="ma-2 mt-9">
      <v-card-title class="secondary white--text floating-title">Wallet</v-card-title>
      <v-card-text>
        <div style="">
          <div style="float: left">
            <v-icon size="200px">mdi-wallet</v-icon>
          </div>
          <div style="float: left">
            <h2 class="mt-8">Balance:&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;{{ user.balance }} INR</h2>
            <h2 class="mt-3">Profile Status:&emsp;&emsp;&emsp;ACTIVE</h2>
            <h2 class="mt-3">Kyc Verification:&emsp;&emsp;{{ user.kycVerified ? "Verified" : "PENDING" }}</h2>
            <h2 class="mt-3">Email Verification:&emsp;{{ user.emailVerified ? "Verified" : "PENDING" }}</h2>
          </div>
        </div>
        <!--        <v-list-item>-->
        <!--          Wallet Balance: {{ user.balance }} INR-->
        <!--        </v-list-item>-->
      </v-card-text>
    </v-card>
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
