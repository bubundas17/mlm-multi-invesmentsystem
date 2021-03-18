<template>
  <v-layout column wrap>
    <v-card class="ma-2 grey mt-9 bg" min-height="600px">
      <v-card-title class="secondary white--text floating-title">Active Get Help
        <v-spacer></v-spacer>
        <v-btn rounded class="primary ps-" to="/app/investments/new">Donate New</v-btn>
      </v-card-title>
      <v-card-text class="">
        <h2 class="mt-3 text-center white--text">Your Give Help.</h2>
        <v-layout row wrap class="justify-center align-center" style="min-height: 500px">
          <v-flex md3 v-for="inv in investments" key="inv._id">
            <v-card class="mx-auto spin-item" elevation="4">
              <v-card-text class="">
                <v-layout row wrap>
                  <v-spacer/>
                  <v-chip color="primary mt-n8 mr-n4">{{ inv.status }}</v-chip>
                </v-layout>
                <div class="my-3">
                  <h2 class="text-center py-3 display-2"><span
                    style="position: absolute; font-size: 25px; font-weight: 900; top: 21px; margin-left: -11px;">₹</span>
                    {{ inv.amount }}</h2>
                </div>
                <span></span>
              </v-card-text>
              <h3 class="text-center">Expires {{ inv.endDate | expires }}</h3>
              <v-card-actions class="mt-auto">
                <v-btn block class="ma-0 primary" flat :disabled="!inv.spinAvailable" @click="openDialog(inv._id)">
                  {{ inv.spinAvailable ? "TRY Your Luck" : "Next " + fromNow(inv.nextSpin) }}
                </v-btn>
              </v-card-actions>
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
        <v-card style="overflow: hidden" class="">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="resultsDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-layout class=" px-5  py-3 align-center">
            <img :src="this.zodiacSign" width="50px" class="ma-2">
            <span class="title">{{ text }}</span>
          </v-layout>
          <v-card-text class="headline text-center">
            Congratulations! Your Wining Is: {{ earned.percentage }}%! Your Luck Earned You {{ earned.creditAmount }}
            INR.
            <br>

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
        <v-card style="overflow: hidden" class="wheel-bg">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false" color="white">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <h2 class="text-center white--text">Your Luck</h2>
            <wheel style="min-height: 400px" :investment-id="investmentId" @completed="spinCompleted"></wheel>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-layout>
</template>

<script>
import Wheel from "~/components/lucky-wheel/lucky-wheel";
import moment from "moment";

export default {
  name: "index",
  components: {Wheel},
  layout: "dashboard",
  async asyncData({app}) {
    let data = await app.$axios.$get("/investments")
    let settings = await app.$axios.$get("/settings/other")
    return {investments: data.investments, settings}
  },
  filters: {
    expires(val) {
      return moment(val).format("DD/MM/YYYY")
    }
  },
  data() {
    return {
      dialog: false,
      resultsDialog: false,
      earned: 0,
      resultsError: "",
      investmentId: "",
      settings: {
        popup: {
          enabled: false,
          text: ""
        },
        promotion: {
          bonus: "",
          future: ""
        },
        zodiac: {
          aries: "",
          taurus: "",
          gemini: "",
          cancer: "",
          leo: "",
          virgo: "",
          libra: "",
          scorpio: "",
          sagittarius: "",
          capricorn: "",
          aquarius: "",
          pisces: "",
        }
      }
    }
  },
  computed: {
    text() {
      return this.settings.zodiac[this.zodiac]
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
    fromNow(date) {
      let start = moment(Date.now());
      let stop = moment(date);
      return stop.from(start);
    }

  },

}
</script>

<style scoped>
.spin-item {
  height: 200px;
  width: 200px;
}

.bg {
  background-image: url("/images/spin-list-bg.jpg");
  background-size: cover;
}

.wheel-bg {
  background-image: url("/images/wheel.jpg");
  background-size: cover;
}
</style>
