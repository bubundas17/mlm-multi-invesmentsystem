<template>
  <v-layout column wrap>
    <v-card class="ma-2 mt-9">
      <v-card-title class="secondary white--text floating-title">
        Withdrawal Money
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-select
            v-model="paymentMode"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Select Payment Method"
            required
          ></v-select>
          <template v-if="paymentMode === 'UPI' ">
            <v-text-field
              v-model="upiID"
              :rules="upiRules"
              label="UPI ID"
              required
            ></v-text-field>
          </template>
          <template v-else>
            <v-text-field
              v-model="payeeName"
              required
              label="Name"
            ></v-text-field>
            <v-text-field
              v-model="accountNumber"
              required
              label="Account Number"
            ></v-text-field>
            <v-text-field
              v-model="confirmAccountNumber"
              required
              label="Confirm Account Number"
            ></v-text-field>
            <v-text-field
              v-model="ifscCode"
              required
              label="IFSC Code"
            ></v-text-field>
            <v-text-field
              v-model="confirmIfscCode"
              required
              label="Reenter IFSC Code"
            ></v-text-field>
          </template>


          <v-text-field
            label="Enter Amount To Withdrawal"
            v-model="amount"
            :rules="amountRules"
            type="number"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer><v-btn class="primary">Withdrawal</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "index",
  layout: "dashboard",
  data() {
    return {
      items: [
        "UPI",
        "NEFT",
      ],
      upiID: "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: "",
      confirmIfscCode: "",
      payeeName: "",
      upiRules: [
        v => !!v || 'UPI ID is required',
        v => /^[\w.-]+@[\w.-]+$/.test(v) || 'UPI ID must be valid',
      ],
      amountRules: [
        v => !!v || 'Amount Is Required',
        v => v >= 500 || 'Minimum Withdrawal 500 INR',
        v => v <= this.user.balance || 'Not Enough Balance',
      ],
      paymentMode: "UPI",
      amount: 0
    }
  }
}
</script>

<style scoped>

</style>
