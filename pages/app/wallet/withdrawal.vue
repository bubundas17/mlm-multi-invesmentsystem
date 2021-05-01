<template>
  <v-layout column wrap>
    <v-card class="ma-2 mt-9">
      <v-card-title class="secondary white--text floating-title">
        Withdrawal Money
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="paymentMode"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Select Payment Method"
          required
        ></v-select>
        <template v-if="paymentMode === 'UPI' ">

          <v-form ref="upi">

            <v-text-field
              v-model="upiID"
              :rules="upiRules"
              label="UPI ID"
              required
            ></v-text-field>


            <v-textarea
              v-model="note"
              :rules="noteRules"
              label="Reason For Withdrawal"
            ></v-textarea>
            <v-text-field
              label="Enter Amount To Withdrawal"
              v-model="amount"
              :rules="amountRules"
              type="number"
              required
            ></v-text-field>
          </v-form>
        </template>
        <template v-else>
          <v-form ref="neft">

            <v-text-field
              v-model="payeeName"
              required
              :rules="nameRules"
              label="Name"
            ></v-text-field>
            <v-text-field
              v-model="accountNumber"
              required
              :rules="accnumRules"
              label="Account Number"
            ></v-text-field>

            <!--            <v-text-field-->
            <!--              v-model="confirmAccountNumber"-->
            <!--              required-->
            <!--              label="Confirm Account Number"-->
            <!--            ></v-text-field>-->
            <v-text-field
              v-model="ifscCode"
              required
              :rules="ifscRules"
              label="IFSC Code"
            ></v-text-field>

            <v-textarea
              v-model="note"
              :rules="noteRules"
              label="Reason For Withdrawal"
            ></v-textarea>
            <v-text-field
              label="Enter Amount To Withdrawal"
              v-model="amount"
              :rules="amountRules"
              type="number"
              required
            ></v-text-field>
            <!--            <v-text-field-->
            <!--              v-model="confirmIfscCode"-->
            <!--              required-->
            <!--              label="Reenter IFSC Code"-->
            <!--            ></v-text-field>-->
          </v-form>
        </template>
        <p>
          Admin Fees : {{ (amount * 0.10).toFixed(0) }} INR
        </p>
        <p>
          YOU'll GET: {{ amount - (amount * 0.10).toFixed(0) }} INR
        </p>
      </v-card-text>
      <v-card-actions>

        <v-spacer></v-spacer>
        <v-btn class="primary" @click="submit">Withdrawal</v-btn>
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
      lt:null,
      min: 200,
      max: 2000,
      items: [
        "UPI",
        "NEFT",
      ],
      upiID: "",
      note: "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: "",
      confirmIfscCode: "",
      payeeName: "",
      upiRules: [
        v => !!v || 'UPI ID is required',
        v => /^[\w.-]+@[\w.-]+$/.test(v) || 'UPI ID must be valid',
      ],
      nameRules: [
        v => !!v || 'Name is required',
        // v => /^[\w.-]+@[\w.-]+$/.test(v) || 'UPI ID must be valid',
      ],
      accnumRules: [
        v => !!v || 'Account Number is required',
        // v => /^[\w.-]+@[\w.-]+$/.test(v) || 'UPI ID must be valid',
      ],
      ifscRules: [
        v => !!v || 'IFSC is required',
        v => /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/g.test(v) || 'Enter Valid IFSC Code',
      ],
      amountRules: [
        v => !!v || 'Amount Is Required',
        v => v >= this.min || 'Minimum Withdrawal 200 INR',
        v => v <= this.max || 'Maximum Withdrawal 2000 INR',
        v => v <= this.user.balance || 'Not Enough Balance',
      ],
      noteRules: [
        v => !!v || 'Withdrawal Reason Required',
      ],

      paymentMode: "UPI",
      amount: 200
    }
  },
  methods: {
    async submit() {
      this.saveAll()
      let description = ""
      if (this.paymentMode === "UPI") {
        if (!this.$refs.upi.validate()) return;
        description = `UPI ID: ${this.upiID}\nNOTE: ${this.note}`
      } else {
        if (!this.$refs.neft.validate()) return;
        description = `Name: ${this.payeeName}\nA/C NO: ${this.accountNumber}\nIFSC CODE: ${this.ifscCode} \nNOTE: ${this.note} \n`
      }

      if (!this.user.kycVerified) return this.showAlert("error", "Please complete KYC to Withdrawal")

      try {
        await this.$axios.post("/withdrawal", {
          amount: this.amount,
          description: description
        })
        await this.$store.dispatch("refreshUser");
        this.showAlert("success", "Withdrawal Req Submitted!")
        this.$router.push("/app/")
      } catch (e) {
        console.log(e);
      }

    },
    saveAll(){
      if(process.client){
        this.lt.setItem("payment", JSON.stringify({
          upiID: this.upiID,
          accountNumber: this.accountNumber,
          confirmAccountNumber: this.confirmAccountNumber,
          ifscCode: this.ifscCode,
          confirmIfscCode: this.confirmIfscCode,
          payeeName: this.payeeName,
          paymentMode: this.paymentMode,
        }));
      }
    }
  },
  watch: {

    paymentMode(val) {
      try {
        this.$refs.upi.resetValidation();

      } catch (e) {

      }
      try {
        this.$refs.neft.resetValidation();

      } catch (e) {

      }
    }
  },
  mounted() {
    if(process.client){
      this.lt =window.localStorage;
      let data = this.lt.getItem('payment');
      if(!data) return
      data = JSON.parse(data)
      if(data.upiID) this.upiID = data.upiID
      if(data.accountNumber) this.accountNumber = data.accountNumber
      if(data.confirmAccountNumber) this.confirmAccountNumber = data.confirmAccountNumber
      if(data.ifscCode) this.ifscCode = data.ifscCode
      if(data.confirmIfscCode) this.confirmIfscCode = data.confirmIfscCode
      if(data.payeeName) this.payeeName = data.payeeName
      if(data.paymentMode) this.paymentMode = data.paymentMode
    }
  }
}
</script>

<style scoped>

</style>
