<template>
  <v-app light :class="{blur: isLoading}">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-toolbar>
        <v-toolbar-title>Admin Panel</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <template v-for="item in items">
          <v-list-group
            v-if="item.nested"
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.action"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.to"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            :key="item.title"
            v-if="!item.nested"
            :to="item.to"
          >
            <v-list-tile-action>
              <v-icon >{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      fixed
      app
      dark
      color="nav"
    >
      <v-spacer/>
      <v-spacer/>
      <v-toolbar-items>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in items" :to="item.to" :key="item.title">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <LoginDialog v-if="!isLoggedIn"/>
        <ProfileDialog v-if="isLoggedIn"/>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"/>
    </v-toolbar>
    <v-content>
      <alerts></alerts>
      <nuxt/>
    </v-content>
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
        drawer: true,
        items: [
          {
            action: 'pages',
            title: 'Dashboard',
            nested: false,
            to: "/user"
          }, {
            action: 'mdi-alert-octagon',
            title: 'Torrents',
            nested: true,
            items: [
              {title: 'Torrents', to: "/user/torrents"},
              {title: 'Submit Torrents', to: "/user/torrents/submit"},
            ]
          }, {
            action: 'mdi-alert-octagon',
            title: 'Saved Torrents',
            nested: true,
            items: [
              {title: 'Saved Torrents', to: "/user/saved"}
            ]
          }, {
            action: 'settings',
            title: 'Settings',
            nested: false,
            to: "/"
          },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Solid Torrents'
      }
    },
    methods: {
      search() {
        this.$router.push({path: '/search', query: {q: this.searchKeyword}})
      }
    },
    computed: {
      searchQ() {
        return this.$route.query.q
      },
      isLoading() {
        return this.$store.state.loading.loading
      }
    },
    watch: {
      searchQ(value) {
        this.searchKeyword = value;
      }
    },
    mounted() {
      this.searchKeyword = this.$route.query.q;
      console.log(this.isLoading)
    }
  }
</script>
<style>
  .blur {
    filter: blur(5px);
  }
</style>
