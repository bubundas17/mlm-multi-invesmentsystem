<template>
  <v-layout column>
    <v-card class="ma-2 mt-9">
      <v-card-title class="secondary white--text floating-title">Wallet</v-card-title>
      <v-list>
        <v-list-item>
          Wallet Balance: {{ user.balance }} INR
        </v-list-item>
      </v-list>
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
