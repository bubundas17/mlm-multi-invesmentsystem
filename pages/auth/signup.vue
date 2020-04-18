<template>
  <v-layout class="bg" justify-center="" align-center="">
    <v-container>
      <v-card class="login-box">
        <v-card-title>
          <h1 class="headline">Create an Account</h1>
        </v-card-title>
        <v-form ref="form">
          <v-card-text>
            <v-text-field placeholder="Name" prepend-icon="mdi-account-circle" name="name" v-model="name" :rules="nameRules"/>
            <v-text-field placeholder="Username" prepend-icon="mdi-account-circle" name="username" v-model="username" :rules="usernameRules"/>
            <v-text-field placeholder="Email ID" prepend-icon="mdi-at" name="email" v-model="email" :rules="emailRules"/>
            <v-text-field placeholder="10 Digit Mobile Number" prepend-icon="mdi-cellphone-android" name="phone" v-model="phone" :rules="PhoneRules"/>
            <v-text-field placeholder="Password" prepend-icon="mdi-form-textbox-password" name="password" type="password"
                          v-model="password" :rules="passRules"/>
            <v-text-field placeholder="Confirm Password" prepend-icon="mdi-form-textbox-password" name="password"
                          type="password" v-model="passwordc" :rules="passcRules"/>
            <v-text-field placeholder="Referral Code (Optional)" prepend-icon="mdi-at" name="Referral Code" v-model="refer" :disabled="referDisabled"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text color="success" to="/auth/login" width="auto">
              <v-icon left>mdi-login</v-icon>
              Login Instead
            </v-btn>

            <v-btn text color="info" @click="signup" :loading="loading">
              <v-icon left>mdi-account-plus-outline</v-icon>
              Sign Up
            </v-btn>

            <!--<v-btn flat color="error"> <v-icon left>mdi-account-question-outline</v-icon>Can't login?</v-btn>-->
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        refer: "",
        referDisabled: false,
        passwordc: "",
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters'
        ],
        usernameRules: [
          v => !!v || 'Username is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters',
          v => /^[a-z0-9]+(?:[_-]?[a-z0-9])*$/.test(v) || "Please enter valid username"
        ],
        PhoneRules: [
          v => !!v || 'Mobile is required',
          v => (v && v.length == 10) || 'Mobile must be 10 Correctors Long.',
          v => /^[7-9][0-9]{9}$/.test(v) || "Please enter valid Mobile number"
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
        ],
        passcRules: [
          v => !!v || "Please Enter Confirm Password",
          v => v === this.password || "Password Did'nt Match"
        ],
        passRules: [
          v => !!v || "Password is required",
          v => (v && v.length >= 6) || 'Password must be more than 6 characters',
          v => v === this.password || "Password Did'nt Match"
        ]
      }
    },
    methods: {
      async signup() {
        if (this.$refs.form.validate()) {
          try {
            this.loading = true;
            await this.$axios.post("/auth/signup", {username: this.username, email: this.email, name: this.name, password: this.password, refer: this.refer, phone: this.phone});
            this.showAlert("success", "SignUp Done!, Trying To Login...");
            setTimeout(() => {
              this.$store.dispatch("login", {username: this.username, password: this.password})
            }, 1000)
          } catch (e) {

            this.showAlert("error", e.response.data.message);
          }
          this.loading = false;
        }
      }
    },
    mounted() {
      let ref = this.$route.query.ref;
      if(ref) {
        this.refer = ref;
        this.referDisabled = true
      }
    },
    watch: {
      isLoggedIn(val) {
        if (val) {
          this.$router.go(-1)
        }
      }
    },
    head() {
      return {
        title: `SignUp`
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
