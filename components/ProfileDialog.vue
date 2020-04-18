<template>
  <v-menu :close-on-content-click="false" bottom open-on-hover offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" text>
        <v-icon left>mdi-account-circle</v-icon>
        <span class="hidden-md-and-down">{{ user.name }}</span>
      </v-btn>
    </template>
    <v-card width="250px">
      <v-list>
        <v-list-item avatar two-line>
          <v-list-item-avatar>
            <v-avatar class="indigo">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <h2 class="title">{{ user.name }}</h2>
            </v-list-item-title>
            <v-list-item-sub-title>
              Balance: {{ Number(user.balance).toFixed(2) }} ATC
            </v-list-item-sub-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item to="/profile" dense>
          <v-list-item-avatar>
            <v-icon :loading="loading">mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            Profile
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/app" dense exact>
          <v-list-item-avatar>
            <v-icon :loading="loading">mdi-view-dashboard</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            Dashboard
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/app/wallet" dense exact>
          <v-list-item-avatar>
            <v-icon :loading="loading">mdi-wallet</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            Wallet
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout" dense>
          <v-list-item-avatar>
            <v-icon :loading="loading">mdi-logout</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            Logout
          </v-list-item-content>
        </v-list-item>
<!--        <v-divider></v-divider>-->

<!--        <v-list-item dense @click="toggleDarkMode">-->
<!--          <v-list-item-avatar>-->
<!--            <v-icon>{{ darkMode ? "mdi-brightness-6" : "mdi-brightness-4"}}</v-icon>-->
<!--          </v-list-item-avatar>-->
<!--          <v-list-item-content>-->
<!--            <span>{{ darkMode ? "Light Mode" :  "Dark Mode" }}-->
<!--              <v-chip small color="teal" text-color="white"> Alpha</v-chip>-->
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
