<template>
  <v-layout column>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">
        Email All Users
      </v-card-title>
      <v-card-text>
        <v-text-field label="Subject" v-model="emailSub"/>
        <v-textarea label="Email Contents" v-model="emailContent">

        </v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click="sendEmail" :disabled="emailLoading" :loading="emailLoading">Send</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">
        SMS All Users
      </v-card-title>
      <v-card-text>
        <v-textarea label="SMS Content" v-model="smsContents">

        </v-textarea>
        <span>Length: {{ smsLength }} ||</span>
        <span>Cost: {{ smsCost }} SMS/User || TOTAL {{ userCount * smsCost }} SMS</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click="sendSMS" :disabled="smsLoading" :loading="smsLoading">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import sms from "sms-counter"

export default {
  name: "index",
  layout: "dashboard",
  async asyncData({app}) {
    let users = await app.$axios.$get("/bulk")
    return {
      userCount: users.count
    }
  },

  data() {
    return {
      smsContents: "",
      emailSub: "",
      emailContent: "",
      smsLoading: false,
      emailLoading: false
    }
  },
  computed: {
    smsCost() {
      return sms.count(this.smsContents).messages
    },
    smsLength() {
      return sms.count(this.smsContents).length
    }
  },
  methods: {
    async sendSMS(){
      try {
        this.smsLoading= true
        let users = await this.$axios.$post("/bulk/sms", {content: this.smsContents})
        this.smsContents = ""
        this.showAlert("success", "SMS Sending Started In background.")
      } catch (e) {
        this.showAlert("error", "Error In sending SMS")
      }
      this.smsLoading= false

    },
    async sendEmail(){
      try {
        this.emailLoading= true
        let users = await this.$axios.$post("/bulk/email", {content: this.emailContent, subject: this.emailSub})
        this.smsContents = ""
        this.showAlert("success", "Email Sending Started In background.")
      } catch (e) {
        this.showAlert("error", "Error In sending Email")
      }
      this.emailLoading= false
    }
  }
}
</script>

<style scoped>

</style>
