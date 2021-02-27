<template>
  <v-layout class="bg" justify-center="" align-center="">
    <v-container>
      <v-card class="login-box">
        <v-card-title>
          <h1 class="headline">Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field placeholder="Username" prepend-icon="mdi-account-circle" name="username" v-model="username">
            </v-text-field>
            <v-text-field placeholder="Password" prepend-icon="mdi-form-textbox-password" name="password"
                          :type="loginshown ? 'text' : 'password'" v-model="password">
              <template slot="append">
                <v-btn icon @click="loginshown =!loginshown"><v-icon>{{ loginshown ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}</v-icon></v-btn>
              </template>
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="info" to="/auth/signup">
            <v-icon left>mdi-account-plus-outline</v-icon>
            Sign Up
          </v-btn>
          <v-btn text color="success" @click="login">
            <v-icon left>mdi-login</v-icon>
            Login
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
      password: ""
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login", {username: this.username, password: this.password})
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
