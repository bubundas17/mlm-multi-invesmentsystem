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
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"/>
      <img :src="require('../assets/images/logo.svg')" style="max-height: 60%">
      <v-toolbar-title v-text="title" class="ml-2 hidden-sm-and-down"/>
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
    <v-footer class="grey lighten-3" app>
      <span class="px-2">amplecoin.in &copy;2020</span>
<!--      <v-spacer/>-->
<!--      <nuxt-link to="/about" :class="darkMode ? 'white&#45;&#45;text': ''" class="px-2">About Us</nuxt-link>-->
<!--      |-->
<!--      <nuxt-link to="/donate" class="px-2" :class="darkMode ? 'white&#45;&#45;text': ''">Donate</nuxt-link>-->
<!--      |-->
<!--      <nuxt-link to="/dmca" class="px-2" :class="darkMode ? 'white&#45;&#45;text': ''">DMCA</nuxt-link>-->
<!--      |-->
<!--      <nuxt-link class="px-2" :class="darkMode ? 'white&#45;&#45;text': ''" to="/privacy">Privacy Policy</nuxt-link>-->
    </v-footer>
  </v-app>
</template>

<script>
    import Alerts from "../components/Alerts";
    import LoginDialog from "../components/LoginDialog";
    import ProfileDialog from "../components/ProfileDialog";

    export default {
        components: { Alerts, LoginDialog, ProfileDialog},
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
                title: "AmppleCoin"
            };
        },
        methods: {
        },
        computed: {
        },
        watch: {
        },
        mounted() {
        },
    };
</script>

<style>
</style>
