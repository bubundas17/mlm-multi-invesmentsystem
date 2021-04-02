<template>
  <v-layout column style="height: 100%" class="grey darken-4 justify-center align-center">
    <v-card class="ma-2 mt-12" min-width="300px" width="500px">
      <v-card-title class="secondary white--text floating-title">
        New Give Help Plan
      </v-card-title>
      <v-card-text>
        <h2 class="text-center my-3">Enter Amount You want To Donate</h2>
        <v-text-field solo label="Enter Amount" rounded v-model="amount">
          <template slot="append">
            <v-btn rounded class="primary" @click="pay">
              <v-icon left>mdi-cart-outline</v-icon>
              Donate
            </v-btn>
          </template>
        </v-text-field>
      </v-card-text>
    </v-card>
    <v-card class="ma-2 mt-12" min-width="300px" width="500px">
      <v-card-title class="secondary white--text">
        Other Payment Info
      </v-card-title>
      <v-card-text>
        <h3 class="sub-title mt-3">Bank Account Info</h3>
        Bank: Union Bank <br>
        A/C NO: 373601010055001 <br>
        IFSX: UBIN0537365

        <h3 class="sub-title mt-3 mb-3">PayTM</h3>
        <v-img src="/images/paytm-qr.jpeg"></v-img>
        <h3 class="sub-title mt-3 mb-3">GPay QR</h3>
        <v-img src="/images/upi-qr.jpeg"></v-img>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "new.vue",
  layout: "dashboard",
  async asyncData({app}) {
    try {
      let data = await app.$axios.$get("/investments/new")
      console.log(data)
      return {
        canInvest: data.canInvest
      }
    } catch (e) {
      return {
        canInvest: false
      }

    }
  },
  data() {
    return {
      amount: 500,
      min: 100,
      max: 100000
    }
  },
  computed: {
    rPayAmount() {
      return Math.floor(parseInt(this.amount) * 100)
    }
  },
  methods: {
    async submitPayment(payment) {
      try {
        await this.$axios.$post("/investments/buy", {payment, amount: this.rPayAmount})
        this.showAlert("success", "Investment Success!")
        this.$router.push("/app/investments")
      } catch (e) {
        this.showAlert("error", "Payment Failed.")
      }
    },
    // Object
    // checkout_logo: "https://dashboard-activation.s3.amazonaws.com/org_100000razorpay/checkout_logo/phpnHMpJe"
    // custom_branding: false
    // org_logo: ""
    // org_name: "Razorpay Software Private Ltd"
    // razorpay_payment_id: "pay_GXxK3sGeaGiX7E"
    // __proto__: Object
    async pay() {

      if (!this.user.isActive) return this.showAlert("error", "Complete your KYC First.")
      if (this.amount < this.min) return this.showAlert("error", "Minimum Amount is 200 INR")
      if (this.amount > this.max) return this.showAlert("error", "Maximum Amount is 5000 INR")
      if (!this.canInvest) return this.showAlert("error", "You cannot Invest More Right Now.")
      var options = {
        key: "rzp_test_KJcjoHIWEsmVBD",
        amount: this.rPayAmount,
        currency: 'INR',
        name: "The Truth Club",

        description: "Payment Description",
        // order_id: 'sadsad',
        prefill: {
          name: this.user.name,
          email: this.user.email,
          contact: this.user.phone
        },
        theme: {
          color: "#f55c1f"
        },
        handler: (response) => {
          // console.log(response);
          this.submitPayment(response);
        },
      };
      var rzp = new Razorpay(options);
      rzp.open();
    }
  }
}
</script>

<style scoped>

</style>
