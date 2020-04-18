<template>
  <v-layout warp column>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">Profile</v-card-title>
      <v-card-text class="pt-3">
        <v-form ref="profileinfo">
          <v-text-field v-model="user.username" label="username" disabled/>
          <v-text-field v-model="user.name" :rules="nameRules" label="Full Name"/>
          <v-text-field v-model="user.email" :rules="emailRules" label="Email"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/> <v-btn class="primary" @click="changeProfileInfo">Save</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="ma-2">
      <v-card-title class="secondary white--text">Password Change</v-card-title>
      <v-card-text>
        <v-form ref="pass">
        <v-text-field label="Old Password" :rules="passRules"/>
        <v-text-field label="New Password" :rules="passRules"/>
        <v-text-field label="Confirm New Password" :rules="passcRules"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/> <v-btn class="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app}){
      let user = await app.$axios.$get("/profile");
      // console.log(user.data);
      return {
        user: user.user
      }
    },
    data(){
      return {
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters'
        ],
        usernameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters',
          v => /^[a-z0-9]+(?:[_-]?[a-z0-9])*$/.test(v) || "Please enter valid username"
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
      async changeProfileInfo() {
        if (this.$refs.profileinfo.validate()) {

        }
      },
      async chengePassword(){
        if (this.$refs.pass.validate()) {

        }
      }
    }
  }
</script>

<style scoped>

</style>
