<template>
  <v-menu :close-on-content-click="true" open-on-hover bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" text>
        <v-icon left>mdi-account-circle</v-icon>
        Login
      </v-btn>
    </template>


    <v-card width="250px" class="pa-0 ma-0">
      <v-list>
        <v-list-item avatar two-line>
          <v-list-item-avatar>
            <v-avatar class="indigo">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <h2 class="title">Login/Sign Up</h2>
            </v-list-item-title>
            <v-list-item-sub-title>
             Anonymous User
            </v-list-item-sub-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item to="/auth/login"  dense>
          <v-list-item-avatar>
            <v-icon :loading="loading">mdi-login</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            Login
          </v-list-item-content>
        </v-list-item>


        <v-list-item to="/auth/signup" dense>
          <v-list-item-avatar>
            <v-icon :loading="loading">mdi-account-multiple-plus-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            Sign Up
          </v-list-item-content>
        </v-list-item>
<!--        <v-divider></v-divider>-->

<!--        <v-list-item dense to="/add-torrent">-->
<!--          <v-list-item-avatar>-->
<!--            <v-icon>mdi-magnet-on</v-icon>-->
<!--          </v-list-item-avatar>-->
<!--          <v-list-item-content >-->
<!--            <span> Add Torrent-->
<!--              <v-chip small color="red" text-color="white">new</v-chip>-->
<!--            </span>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->





      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        username: "",
        password: "",
      }
    },
    methods: {
      async login() {
        try {
          this.loading = true;
          let user = await this.$axios.$post("/login", {
            username: this.username,
            password: this.password
          });
          this.loading = false;
          this.$store.commit("user", user.user);
          this.$store.commit("loggedIn", true);
          this.$router.push("/");
          this.$router.reload();
          this.showAlert("success", "Welcome Back " + user.user.name)
        } catch (error) {
          this.loading = false;
          if (error.response.status === 401) return this.showAlert("error", error.response.data.message);
        }
      },
      async logout() {
        if (!this.loading) {
          try {
            this.$store.dispatch("logout");
            this.showAlert("success", "logged You Out.")
          } catch (error) {
            this.loading = false;
            if (error.response.status === 401) return this.showAlert("error", error.response.data.message);
          }
        }
      },
      toggleDarkMode() {
        this.$store.commit("toggleDarkMode")
      }
    }
  }
</script>
<style scoped>

</style>
