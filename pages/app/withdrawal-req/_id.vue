<template>
  <v-layout column wrap>
    <v-card class="ma-3">
      <v-card-title>Withdrawal Req Details</v-card-title>
      <v-card-text>
        <v-layout>
          <v-flex md6>
            <p>
              Name: {{ withdrawal.user.name }}
              <v-btn rounded small color="secondary " class="ml-3"
                     @click="$router.push('/app/users/' + withdrawal.user._id)">view
              </v-btn>
            </p>
            <p>
              STATUS: {{ withdrawal.status }}
            <p>
            <p>
              Total: {{ (withdrawal.amount).toFixed(0) }}
            <p>
              FEES: {{ (withdrawal.amount * 0.10).toFixed(0) }}
            </p>
            <p>
              After Fees: {{ (withdrawal.amount * 0.90).toFixed(0) }}
            </p>
            <p>
              Is Refunded: {{ withdrawal.refunded ? "REFUNDED" : "NOT REFUNDED" }}
            </p>
            <pre>{{ withdrawal.description }}</pre>
          </v-flex>
          <v-flex md6>
            <v-layout wrap class="justify-center align-center">
              <canvas ref="canvas"></canvas>
            </v-layout>
          </v-flex>
        </v-layout>

      </v-card-text>
      <v-card-actions>
        <!--        <v-btn text color="primary">SAVE</v-btn>-->
        <v-btn text color="success" @click="completed">Mark As Completed</v-btn>
        <v-btn text color="warning" @click="failed">Refund And mark Failed</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
const QRCode = require('qrcode')
export default {
  name: "index",
  layout: "dashboard",
  async asyncData({app, route}) {
    let withdrawal = await app.$axios.$get("/withdrawal/" + route.params.id);
    return {
      withdrawal: withdrawal.withdrawal
    }
  },
  methods: {
    async completed() {
      try {
        await this.$axios.$post("/withdrawal/" + this.$route.params.id + "/completed")
        this.$router.go(-1)
      } catch (e) {
        this.showAlert("error", "Some Error Occurred.")
      }
    },
    async failed() {
      try {
        await this.$axios.$post("/withdrawal/" + this.$route.params.id + "/failed")
        this.showAlert("success", "Completed")
        this.$router.go(-1)
      } catch (e) {
        this.showAlert("error", "Some Error Occurred.")
        this.showAlert("success", "Marked As failed")
      }
    }
  },
  computed: {
    upiUri(){
      let name = /Name:\s(.+)/gm
      let accNo = /A.C\sNO:\s([\d]+)/gm
      let ifscNo = /[A-Za-z]{4}0[A-Z0-9a-z]{6}/g
      let upiID = /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/gm
      let output = ""
      if(ifscNo.test(this.withdrawal.description)){
        output= "upi://pay?pa="
        let name = this.withdrawal.user.name
        let amount = (this.withdrawal.amount * 0.90).toFixed(0)
        let accNumber = accNo.exec(this.withdrawal.description)[1];
        let ifscNumber = this.withdrawal.description.match(ifscNo)[0];
        output += accNumber;
        output += "@";
        output += ifscNumber +".ifsc.npci";
        output += "&pn=";
        output += encodeURI(name);
        output += "&cu=INR";
        output += "&am=";
        output += amount;

        console.log()
      } else {
        console.log("UPI")
        let name = this.withdrawal.user.name
        let amount = (this.withdrawal.amount * 0.90).toFixed(0)
        let upi = this.withdrawal.description.match(upiID)[0];
        output= "upi://pay?pa="
        output += upi;
        output += "&pn=";
        output += encodeURI(name);
        output += "&cu=INR";
        output += "&am=";
        output += amount;
      }
      return output;

    }
  },
  mounted() {
    // upi://pay?pa=917001533982@PYTM0123456.ifsc.npci&pn=Bubun&cu=INR&am=1.00
    QRCode.toCanvas(this.$refs.canvas,
      this.upiUri, {
        toSJISFunc: QRCode.toSJIS,
        quality: 5,
        margin: 1,
        scale: 5
      }, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
  }
}
</script>

<style scoped>

</style>
