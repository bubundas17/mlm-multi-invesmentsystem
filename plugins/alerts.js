import Vue from "vue"
Vue.mixin({
  methods: {
    showAlert(color, message){
      this.$store.dispatch("alert/show", {color, message})
    },
    hideAlert(){
      this.$store.dispatch("alert/hide")
    }
  }
});

Vue.mixin({
  computed: {
    user() {
      return this.$store.getters.user
    },
    darkMode() {
      return this.$store.getters.darkMode
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
});
