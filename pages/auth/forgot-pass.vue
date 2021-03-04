<template>
  <v-layout class="bg" justify-center="" align-center="">
    <v-container>
      <v-card class="login-box">
        <v-card-title>
          <h1 class="headline">Forgot Pass</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field placeholder="Username" prepend-icon="mdi-account-circle" name="username" v-model="username">
            </v-text-field>
            <v-text-field placeholder="OTP" prepend-icon="mdi-lock-check-outline" name="username" v-model="otp"
                          type="number" :disabled="!username">
              <template slot="append">
                <v-btn text color="secondary" @click="getOtp" :disabled="otpSent">{{ otpSent ? "SENT" : "Send OTP" }}</v-btn>
              </template>
            </v-text-field>
            <v-text-field placeholder="New Password" prepend-icon="mdi-account-circle" name="username"
                          v-model="newPass"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="success" @click="submit" :disabled="!otpSent">
            <v-icon left>mdi-login</v-icon>
            Reset
          </v-btn>
          <!--<v-btn flat color="error"> <v-icon left>mdi-account-question-outline</v-icon>Can't login?</v-btn>-->
        </v-card-actions>
      </v-card>
    </v-container>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      loginshown: false,
      username: "",
      otpSent: false,
      otp: "",
      newPass: "",
      otpCountDown: null
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login", {username: this.username, password: this.password})
    },
    async getOtp() {
      try {
        await this.$axios.$post("/auth/forgot-pass", {username: this.username})
        this.otpSent = true;
        this.showAlert("success", "OTP sent to registered email and phone")
      } catch (e) {
        this.showAlert("error", "Failed To send OTP. Please check username")
      }
    },
    async submit() {
      if (!this.newPass || this.newPass.length < 6) {
        return this.showAlert("error", "Password must be 6 characters long.")

      }
      try {
        await this.$axios.$post("/auth/reset", {username: this.username, otp: this.otp, newpass: this.newPass})
        this.showAlert("success", "Password Reset Done! Login Now.")
        this.$router.push("/auth/login")
      } catch (e) {
        this.showAlert("error", "Invalid OTP or User Not Found.")
      }

    }
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        this.$router.push("/app")
      }
    }
  },
  head() {
    return {
      title: `Login`
    }
  }
}
</script>
<style scoped>
.bg {
  background: #2d1a5a;
  min-height: 100%;
}

.login-box {
  max-width: 400px;
  margin: 0 auto;
}
</style>
