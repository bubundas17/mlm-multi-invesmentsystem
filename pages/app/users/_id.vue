<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>Edit User</v-card-title>
        <v-card-text>
          <!--          {{ user }}-->
          <v-text-field label="Name" v-model="user.name"/>
          <v-text-field label="Username" v-model="user.username"/>
          <v-text-field label="email" v-model="user.email"/>
          <v-text-field label="Phone" v-model="user.phone"/>
          <v-text-field label="balance" v-model="user.balance" type="number"/>
          <v-checkbox label="KYC Verified?" v-model="user.kycVerified"></v-checkbox>
          <v-checkbox label="Email Verified?" v-model="user.emailVerified"></v-checkbox>

          <h3 class="mt-3 red--text pb-0">Warning! Danger Zone</h3>
          <v-checkbox label="User Banned?" v-model="user.banned"></v-checkbox>
          <v-checkbox label="Have Admin Permissions?" v-model="user.admin"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="secondary" @click="$router.go(-1)">Go back</v-btn>
          <v-btn class="primary" @click="saveUser">Save</v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>
    <v-flex xs12 md6>
      <v-card class="ma-2">
        <v-card-title>
          Change Password
        </v-card-title>
        <v-card-text>
          <v-text-field label="Enter New password" v-model="newpass"/>
          <v-checkbox label="Send Via Email?" v-model="sendPassViaEmail"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn class="primary" @click="setPass">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 md6>
      <v-card class="ma-2">
        <v-card-title>
          Credit/Debit Coins
        </v-card-title>
        <v-card-text>
          <v-text-field label="Enter Amount" type="number" v-model="txnAmount">

          </v-text-field>
          <v-textarea label="Description" height="35px" v-model="txnDescription">

          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn class="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app, route}) {
      let userId = route.params.id;
      let user = await app.$axios.$get("/users/" + userId);

      return {
        user: user.user
      }
    },
    data() {
      return {
        newpass: "",
        sendPassViaEmail: true,
        txnAmount: 0,
        txnDescription: ""
      }
    },
    methods: {
      async saveUser() {
        try {
          let user = await this.$axios.$post("/users/" + this.$route.params.id, this.user)
          this.showAlert("success", "User Info Saved!")
        } catch (e) {
          this.showAlert("error", "Failed To Save User Info!")
        }
      },
      async setPass(){
        try {
          let user = await this.$axios.$post("/users/" + this.$route.params.id + "/setpass", {
            newpass: this.newpass
          });
          this.showAlert("success", "New Pass Set!!")
        } catch (e) {
          this.showAlert("error", "Failed To set pass!")
        }
      }
    }
  }
</script>

<style scoped>

</style>
