<template>
  <v-app :dark="darkMode">
    <v-navigation-drawer v-model="drawer" temporary left app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :to="item.to" :key="i" router exact>
          <v-list-item-action>
            <v-icon v-html="item.icon"/>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip v-if="item.new" small class="red white--text">NEW</v-chip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app dark color="primary">
      <!--      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"/>-->
<!--      <img :src="require('../assets/images/logo.png')" style="max-height: 60%">-->
      <img src="/icon.png" height="56px"><v-toolbar-title v-text="title" class="ml-2 hidden-sm-and-down"/>
      <v-spacer/>
      <v-spacer/>
      <v-toolbar-items></v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="item in items" :to="item.to" :key="item.title">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
          <v-chip v-if="item.new" x-small class="green px-1 ml-n4 mt-n9">new</v-chip>
        </v-btn>

      </v-toolbar-items>
      <LoginDialog v-if="!isLoggedIn"/>
      <ProfileDialog v-if="isLoggedIn"/>
    </v-app-bar>
    <v-content>
      <alerts></alerts>
      <nuxt/>
    </v-content>
    <v-footer
      color="primary lighten-1"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          color="white"
          text
          rounded
          class="my-2"
          to="/"
        >
          Home
        </v-btn>
        <v-btn
          color="white"
          text
          rounded
          class="my-2"
          to="/auth/login"
        >
          Login
        </v-btn>

        <v-btn
          color="white"
          text
          rounded
          to="/auth/signup"
          class="my-2"
        >
          Signup
        </v-btn>
        <v-btn
          color="white"
          text
          rounded
          class="my-2"
          to="/privacy"
        >
          Privacy Policy
        </v-btn>
        <v-btn
          color="white"
          text
          rounded
          to="/terms"
          class="my-2"
        >
          Trams And Condition
        </v-btn>
        <v-btn
          color="white"
          text
          rounded
          to="/contact"
          class="my-2"
        >
          Contact Us
        </v-btn>
        <v-btn
          color="white"
          text
          rounded
          to="/about"
          class="my-2"
        >
          About Us
        </v-btn>        <v-btn
          color="white"
          text
          rounded
          to="/refund"
          class="my-2"
        >
          Refund and Cancellation Policy
        </v-btn>        
        <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>The Truth Club</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
  import Alerts from "../components/Alerts";
  import LoginDialog from "../components/LoginDialog";
  import ProfileDialog from "../components/ProfileDialog";

  export default {
    components: {Alerts, LoginDialog, ProfileDialog},
    data() {
      return {
        searchKeyword: "",
        drawer: false,
        items: [
          // {icon: "mdi-filmstrip", title: "Movies", to: "/movies", new: false},
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: "The Truth Club"
      };
    },
    methods: {},
    computed: {},
    watch: {},
    mounted() {
    },
  };
</script>

<style>
</style>
