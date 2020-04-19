<template>
  <v-app :dark="darkMode">
    <v-navigation-drawer v-model="drawer" left app>
      <v-container class="grey darken-4">
        <img src="@/assets/images/logo.png" style="max-width: 100%; margin: 0 auto" />
        <p class="white--text text-center">Welcome {{ user.name }}</p>
      </v-container>
      <v-list>
        <template v-for="item in dashItems">

          <v-list-group
            :key="item.title"
            v-if="item.nested"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.to"
              v-if="subItem"
              exact
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item v-if="!item.nested" :to="item.to">
            <v-list-item-action><v-icon>{{item.action}}</v-icon></v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app dark color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-lg-and-up"/>
      <img :src="require('../assets/images/logo.png')" style="max-height: 60%">
      <v-toolbar-title v-text="title" class="ml-2 hidden-sm-and-down"/>
      <v-spacer/>
      <v-toolbar-items></v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">

        <v-btn text v-for="item in items" :to="item.to" :key="item.title">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
          <v-chip v-if="item.new" x-small class="green px-1 ml-n4 mt-n9">new</v-chip>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text>
          <v-icon left>mdi-wallet</v-icon> {{ Number(balance).toFixed(0) }} AMP
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <LoginDialog v-if="!isLoggedIn"/>
        <ProfileDialog v-if="isLoggedIn"/>
      </v-toolbar-items>
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
  import vuex from "vuex"
  export default {
    middleware: "authenticated",
    components: {Alerts, LoginDialog, ProfileDialog},
    data() {
      return {
        searchKeyword: "",
        drawer: true,
        items: [
          // {icon: "mdi-filmstrip", title: "Movies", to: "/movies", new: false},
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: "AMPLECOIN"
      };
    },
    methods: {},
    computed: {
      ...vuex.mapGetters([
        "balance"
      ]),
      dashItems() {
        let items = [
          {
            action: 'mdi-view-dashboard',
            title: 'Dashboard',
            nested: false,
            to: "/app"
          },
          // {
          //   action: 'mdi-license',
          //   title: 'License',
          //   nested: true,
          //   active: true,
          //   items: [
          //     {title: 'View', to: "/app/license"},
          //     {title: 'Order', to: "/app/license/order"},
          //   ],
          // },

          {
            action: 'mdi-wallet',
            title: 'Wallet',
            nested: true,
            active: false,
            items: [
              {title: 'Wallet', to: "/app/wallet"},
              // {title: 'Recharge', to: "/app/wallet/recharge"},
              {title: 'Redeem', to: "/app/wallet/redeem"},
              {title: 'Send Coins', to: "/app/wallet/send"},
            ],
          },
          // {
          //   action: 'mdi-lan',
          //   title: 'Resellers',
          //   nested: true,
          //   active: false,
          //   items: [
          //     {title: 'Resellers', to: "/app/resellers"},
          //     this.user.isReseller ? {title: 'Branding', to: "/app/resellers/branding"} : false,
          //     this.user.isReseller ? {title: 'API Access', to: "/app/resellers/api"} : false,
          //   ],
          // },
          {
            action: 'mdi-receipt',
            title: 'Transactions',
            nested: false,
            active: false,
            to: "/app/invoice"
            // items: [
            //   {title: 'Wallet', to: "/app/invoice"},
            // ],
          },
          {
            action: 'mdi-share-all',
            title: 'Refer and Earn',
            nested: false,
            to: "/app/refer"
          },
          {
            action: 'mdi-face-agent',
            title: 'Support',
            nested: false,
            to: "/app/support"
          },
        ];

        if(this.user.admin) {
          items = [...items, ...[
            // {
            //   action: 'mdi-license',
            //   title: 'License Types',
            //   nested: true,
            //   active: false,
            //   items: [
            //     {title: 'View', to: "/app/license-types"},
            //     {title: 'Add', to: "/app/license-types/new"},
            //   ],
            // },
            {
              action: 'mdi-wallet',
              title: 'Vouchers Code',
              nested: true,
              active: false,
              items: [
                {title: 'Generate Vouchers', to: "/app/voucher"},
                // {title: 'Bulk Create', to: "/app/voucher/bulk"},
              ],
            },
            {
              action: 'mdi-account-circle',
              title: 'Users',
              nested: true,
              active: false,
              items: [
                {title: 'All Users', to: "/app/users"},
                {title: 'Add User', to: "/app/users/add"},
                // {title: 'Bulk Create', to: "/app/voucher/bulk"},
              ],
            },
            {
              action: 'mdi-account-check',
              title: 'KYC Requests',
              nested: true,
              active: false,
              items: [
                {title: 'Pending Requests', to: "/app/kyc-req/pending"},
                {title: 'All Requests', to: "/app/kyc-req"},
                // {title: 'Bulk Create', to: "/app/voucher/bulk"},
              ],
            },
          ]]
        }

        return items;
      },
    },
    watch: {
      isLoggedIn(value){
        if(value) {
          this.$router.push("/app")
        } else {
          this.$router.push("/auth/login")
        }
      }
    },
    mounted() {
    },
  };
</script>

<style>
</style>
