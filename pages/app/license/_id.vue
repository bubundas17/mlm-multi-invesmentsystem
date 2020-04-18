<template>
  <v-layout column wrap>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">{{ licenseInfo.licenseType.name }}</v-card-title>
      <v-card-text>

      </v-card-text>
      <v-list>
        <v-list-item>
          Server IP: {{ licenseInfo.serverIP }}
        </v-list-item>
        <v-list-item>
          Ordered: {{ formatData(licenseInfo.created) }}
        </v-list-item>
        <v-list-item>
          Valid Till: {{ formatData(licenseInfo.expires) }}
        </v-list-item>
        <v-list-item>
          Status: {{ licenseInfo.status }}
        </v-list-item>
        <v-list-item>
          Auto Renew: {{ licenseInfo.autoRenew ? "ON" : "OFF" }}
          <v-list-item-action>
            <v-btn class="success mx-6" small rounded @click="toggleAutoRenew">turn {{ licenseInfo.autoRenew ? "OFF" : "ON" }}</v-btn>
          </v-list-item-action>
        </v-list-item>

      </v-list>
      <v-card-actions>
        <v-btn class="success" small @click="renewDialog = true">Renew Now</v-btn>
        <v-btn class="warning darken-2" small @click="changeIpDialog = true" v-if="user.isReseller">Change IP</v-btn>
        <v-btn class="primary" small @click="pauseResumeLicense" v-if="user.isReseller">{{ licenseInfo.status === "PAUSED" ? "RESUME" : "PAUSE" }} License</v-btn>
<!--        <v-btn class="error">Cancel License</v-btn>-->
      </v-card-actions>
      <v-tabs v-model="tab" background-color="secondary" dark>
          <v-tab key="1">
            Installation
          </v-tab>
          <v-tab key="2">
            Commands
          </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item key="1">
          <v-card flat>
            <v-card-text>
              <h2 class="subtitle">Step 1: Login to server</h2>
              <p class="mt-2">
                First ssh into your server with root user.
              </p>
              <v-card-text class="py-1 grey darken-2 mt-2 white--text">
                ssh root@{{ licenseInfo.serverIP }}
              </v-card-text>
              <p class="gray">
              </p>
              <h2 class="subtitle">Step 2: Install our system</h2>
              <p class="mt-2">
                Then Install our license system to your server. skip if already done. (eg. installed while installing one of other licenses)

              </p>
              <v-card-text class="py-1 grey darken-2 mt-2 white--text" v-if="user.isReseller">
                curl -sL https://{{ user.reseller.hostName || "data.easyconfig.net" }}/installer.sh | sudo bash -
              </v-card-text>
              <v-card-text class="py-1 grey darken-2 mt-2 white--text" v-if="!user.isReseller">
                curl -sL https://data.easyconfig.net/installer.sh | sudo bash -
              </v-card-text>
              <v-layout column class="mt-3" v-html="licenseInfo.licenseType.installation"></v-layout>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item key="2">
          <v-card flat>
            <v-card-title>
              Here is a list of commands related to this license
            </v-card-title>
            <v-card-text v-for="command in licenseInfo.licenseType.commands" :key="command.name">
              <p class="body-2">{{ command.description }}</p>
              <v-card-text class="py-1 grey darken-2 mt-2 white--text">
                {{ command.name }}
              </v-card-text>
            </v-card-text>
            <v-card-text>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>


    </v-card>





    <v-dialog
      v-model="changeIpDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Change IP Address</v-card-title>

        <v-card-text>
          Change IP address
          <v-form ref="order">
            <v-text-field label="Server IP address" v-model="ip" :rules="IpRules"></v-text-field>
          </v-form>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            text
            @click="changeIpDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            @click="changeIp"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="renewDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Renew License</v-card-title>

        <v-card-text>
          You are about to renew {{ licenseInfo.licenseType.name }} Please recheck the information and press order now if everything is ok.
          <br> This option will add 30 days to the expiry date.
          <br> And if your license is already expired, it will be renewed for next 30 days.
        </v-card-text>
        <v-list dense>
          <v-divider/>
          <v-list-item>
            <v-list-item-content class="body-1">IP: {{licenseInfo.serverIP}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content class="body-1">License Cost: ${{licenseInfo.amount}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item v-if="user.isReseller">
            <v-list-item-content class="body-1">Reseller Discount: ${{ (licenseInfo.amount - calculatePrice(licenseInfo.amount)).toFixed(2)}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content class="body-1">Total Due: ${{calculatePrice(licenseInfo.amount)}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            text
            @click="renewDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            @click="renewNow"
          >
            Renew Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
  const moment = require("moment");
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app, route}){
      let licenseInfo = await app.$axios.$get("/licenses/"+route.params.id);
      return {
        licenseInfo: licenseInfo.license
      }
    },
    data(){
      return {
        licenseInfo: {},
        tab: null,
        renewDialog: false,
        pauseResumeDialog: false,
        changeIpDialog: false,
        cancelDialog: false,
        ip: "",
        IpRules: [
          v => !!v || 'IP is required',
          v => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v) || "Please enter valid IP"
        ],
      }
    },
    methods: {
      formatData(date) {
        return moment(date).format("MMM Do YYYY")
      },
      async reloadData(){
        let licenseInfo = await this.$axios.$get("/licenses/"+this.$route.params.id);
          this.licenseInfo = licenseInfo.license
      },

      renewNow(){
        this.$axios.$post("/licenses/"+this.$route.params.id+ "/renew")
          .then(data => {
            this.showAlert("success", "Renewed");
            this.$store.dispatch("refreshUser");
            this.renewDialog = false;
            this.reloadData()
          })
          .catch(err => {
            console.log(err.response.data);
            this.showAlert("error", err.response.data.message);
            this.renewDialog = false;
          })

      },
      pauseResumeLicense(){
        this.$axios.$post("/licenses/"+this.$route.params.id+ "/pause-resume")
          .then(data => {
            this.showAlert("success", "Done!");
            this.$store.dispatch("refreshUser");
            this.renewDialog = false;
            this.reloadData()
          })
          .catch(err => {
            console.log(err.response.data);
            this.showAlert("error", err.response.data.message);
            this.renewDialog = false;
          })
      },
      toggleAutoRenew(){
        this.$axios.$post("/licenses/"+this.$route.params.id+ "/toggle-auto-renew")
          .then(data => {
            this.showAlert("success", "Done!");
            this.$store.dispatch("refreshUser");
            this.renewDialog = false;
            this.reloadData()
          })
          .catch(err => {
            console.log(err.response.data);
            this.showAlert("error", err.response.data.message);
            this.renewDialog = false;
          })
      },
      changeIp(){
        if (!this.$refs.order.validate()) return  this.showAlert("success", "Enter Valid IP");

          this.$axios.$post("/licenses/"+this.$route.params.id+ "/change-ip", {
            ip: this.ip
          })
          .then(data => {
            this.showAlert("success", "Done!");
            this.$store.dispatch("refreshUser");
            this.changeIpDialog = false;
            this.reloadData()
          })
          .catch(err => {
            console.log(err.response.data);
            this.showAlert("error", err.response.data.message);
            this.renewDialog = false;
          })
      }
    }
  }
</script>

<style scoped>

</style>
