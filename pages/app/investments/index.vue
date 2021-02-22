<template>
  <v-layout column wrap>
    <v-card class="ma-2 grey lighten-4 mt-9">
      <v-card-title class="secondary white--text floating-title">Active Get Help Plans
        <v-spacer></v-spacer>
        <v-btn rounded class="primary ps-" to="/app/investments/new">Donate New</v-btn>
      </v-card-title>
      <v-card-text class="">
        <p class="mt-3">Your Give Help Plans.</p>
        <v-layout row wrap>
          <v-flex md3 v-for="inv in investments" key="inv._id">
            <v-card class="ma-3" elevation="4">
              <v-card-text>
                <v-layout row wrap>
                  <v-spacer/>
                  <v-chip color="primary mt-n8 mr-n4">{{ inv.status }}</v-chip>
                </v-layout>
                <h2 class="text-center py-3">{{ inv.amount }}</h2>
                <span></span>
              </v-card-text>
              <v-btn block class="ma-0 primary" flat :disabled="!inv.spinAvailable" @click="openDialog(inv._id)">{{ inv.spinAvailable ? "Spin" : "Next " +  fromNow(inv.nextSpin)  }}
              </v-btn>
            </v-card>
          </v-flex>
          <!--          <v-flex md3>-->
          <!--            Test-->
          <!--          </v-flex>-->
          <!--          <v-flex md3>-->
          <!--            Test-->
          <!--          </v-flex>-->
          <!--          <v-flex md3>-->
          <!--            Test-->
          <!--          </v-flex>-->
        </v-layout>
        <!--        <v-card>-->

        <!--        </v-card>-->
      </v-card-text>

      <v-dialog
        v-model="resultsDialog"
        max-width="500"
        persistent
      >
        <v-card style="overflow: hidden">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="resultsDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text class="headline text-center">
            Congratulations! Your Wining Is: {{ earned.percentage }}%! Your Luck Earned  You  {{ earned.creditAmount }} INR.
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog"
        persistent
        max-width="400"
      >
        <!--        <template v-slot:activator="{ on, attrs }">-->
        <!--          <v-btn-->
        <!--            color="primary"-->
        <!--            dark-->
        <!--            v-bind="attrs"-->
        <!--            v-on="on"-->
        <!--          >-->
        <!--            Open Dialog-->
        <!--          </v-btn>-->
        <!--        </template>-->
        <v-card style="overflow: hidden">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <h2 class="text-center">Rotate the wheel</h2>
            <wheel style="min-height: 400px" :investment-id="investmentId" @completed="spinCompleted"></wheel>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-layout>
</template>

<script>
import Wheel from "~/components/lucky-wheel/lucky-wheel";
import  moment from "moment";

export default {
  name: "index",
  components: {Wheel},
  layout: "dashboard",
  async asyncData({app}) {
    let data = await app.$axios.$get("/investments")
    return {investments: data.investments}
  },
  data() {
    return {
      dialog: false,
      resultsDialog: false,
      earned: 0,
      resultsError: "",
      investmentId: ""
    }
  },
  methods: {
    spinNow(id) {
      this.$axios.$post("/investments/" + id + "/spin")
    },
    async spinCompleted(results) {
      let data = await this.$axios.$get("/investments")
      this.investments = data.investments;
      this.dialog = false;

      if (!results) {
        this.earned = null;
        this.resultsError = 1;
      } else {
        this.$store.dispatch("refreshUser")
        this.earned = results;
        this.resultsDialog = true;
      }
    },
    openDialog(investment) {
      this.investmentId = investment;
      this.dialog = true
    },
    fromNow(date){
      let start = moment(Date.now());
      let stop = moment(date);
      return stop.from(start);
    }

  },

}
</script>

<style scoped>

</style>
