import Vue from "vue"
Vue.mixin({
  watch: {
    isLoggedIn(value){
      if(value) {
        this.$router.push("/app")
      } else {
        this.$router.push("/auth/login")
      }
    }
  }
});
