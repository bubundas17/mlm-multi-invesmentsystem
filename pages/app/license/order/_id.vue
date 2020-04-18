<template>
  <v-layout column wrap>
    <v-card class="ma-2">
      <v-card-title class="secondary white--text">Order: {{ name }}</v-card-title>
      <v-card-text>
        <h2 class="subtitle mt-4">Description:</h2>
        <p class="mt-2 body-1">{{ description }}</p>
        <v-form ref="order">
          <v-text-field label="Server IP address" v-model="ip" :rules="IpRules"></v-text-field>
          <v-checkbox label="Auto Renew License?" class="mt-0" v-model="autoRenew"></v-checkbox>
        </v-form>
        <p class="body-1">Price: ${{ calculatePrice(amount) }}/m</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click="prepareOrder">BUY NOW</v-btn>
      </v-card-actions>
    </v-card>

<!--    Not Enough Balance-->
    <v-dialog
      v-model="notEnoughBalance"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Insufficient Balance</v-card-title>

        <v-card-text>
          You do not have enough balance to order this license! Please Recharge your account to complete the order.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            text
            @click="notEnoughBalance = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            to="/app/wallet/recharge"
          >
            Recharge Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!--Order Confirm-->
    <v-dialog
      v-model="confirmationBanner"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Confirm Order</v-card-title>

        <v-card-text>
          You are about to order {{ name }}. Please recheck the information and press order now if everything is ok.
        </v-card-text>
        <v-list dense>
          <v-divider/>
          <v-list-item>
            <v-list-item-content class="body-1">IP: {{ip}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content class="body-1">Auto Renew: {{autoRenew ? "ON" : "OFF"}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content class="body-1">Renew Cycle: 30 Days</v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content class="body-1">License Cost: ${{amount}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item v-if="user.isReseller">
            <v-list-item-content class="body-1">Reseller Discount: ${{ (amount - calculatePrice(amount)).toFixed(2)}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-list-item-content class="body-1">Total Due: ${{calculatePrice(amount)}}</v-list-item-content>
          </v-list-item>
          <v-divider/>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            text
            @click="confirmationBanner = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            @click="OrderNow"
          >
            Order Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
  export default {
    layout: "dashboard",
    async asyncData({app, route}){
      let data = await app.$axios.$get("/license-types/"+route.params.id);
      return {
        name: data.licenseType.name,
        slug: data.licenseType.slug,
        amount: data.licenseType.amount,
        description: data.licenseType.description,
        installation: data.licenseType.installation,
        isVisible: data.licenseType.isVisible,
        commands: data.licenseType.commands,
        sort: data.licenseType.sort
      };
    },
    data(){
      return {
        notEnoughBalance: false,
        confirmationBanner: false,
        ip: "",
        autoRenew: false,
        IpRules: [
          v => !!v || 'IP is required',
          v => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v) || "Please enter valid IP"
        ],
      }
    },
    methods: {
      OrderNow(){
        if(this.user.balance < this.calculatePrice(this.amount)) return this.notEnoughBalance = true;
        this.$axios.$post("/licenses/" + this.$route.params.id + "/order", {
          ip: this.ip
        })
          .then( data => {
            this.showAlert("success", "License Ordered!");
            this.confirmationBanner = false;
            this.$router.go(-1);
            this.$store.dispatch("refreshUser")
          })
          .catch(err => {
            this.showAlert("error", "Failed To Order License")
          })
      },
      prepareOrder(){
        if (this.$refs.order.validate()) {
          if (this.user.balance < this.calculatePrice(this.amount)) return this.notEnoughBalance = true;
          this.confirmationBanner = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
