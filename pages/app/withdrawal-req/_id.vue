<template>
  <v-layout column wrap>
    <v-card class="ma-3">
      <v-card-title>Withdrawal Req Details</v-card-title>
      <v-card-text>
        <p>
          Name: {{ withdrawal.user.name }}
          <v-btn rounded small color="secondary " class="ml-3"
                 @click="$router.push('/app/users/' + withdrawal.user._id)">view
          </v-btn>
        </p>
        <p>
          STATUS: {{ withdrawal.status }}
        <p>
        <p>
          Total: {{ (withdrawal.amount).toFixed(0) }}
        <p>
          FEES: {{ (withdrawal.amount * 0.10).toFixed(0) }}
        </p>
        <p>
          After Fees: {{ (withdrawal.amount * 0.90).toFixed(0) }}
        </p>
        <p>
          Is Refunded: {{ withdrawal.refunded ? "REFUNDED" : "NOT REFUNDED" }}
        </p>
        <pre>{{ withdrawal.description }}</pre>
      </v-card-text>
      <v-card-actions>
        <!--        <v-btn text color="primary">SAVE</v-btn>-->
        <v-btn text color="success" @click="completed">Mark As Completed</v-btn>
        <v-btn text color="warning" @click="failed">Refund And mark Failed</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "index",
  layout: "dashboard",
  async asyncData({app, route}) {
    let withdrawal = await app.$axios.$get("/withdrawal/" + route.params.id);
    return {
      withdrawal: withdrawal.withdrawal
    }
  },
  methods: {
    async completed() {
      try {
        await this.$axios.$post("/withdrawal/" + this.$route.params.id + "/completed")
        this.$router.go(-1)
      } catch (e) {
        this.showAlert("error", "Some Error Occurred.")
      }
    },
    async failed() {
      try {
        await this.$axios.$post("/withdrawal/" + this.$route.params.id + "/failed")
        this.showAlert("success", "Completed")
        this.$router.go(-1)
      } catch (e) {
        this.showAlert("error", "Some Error Occurred.")
        this.showAlert("success", "Marked As failed")
      }
    }
  }
}
</script>

<style scoped>

</style>
