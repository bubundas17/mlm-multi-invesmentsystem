<template>
  <v-layout column>
    <v-card class="ma-3">
      <v-card-title class="secondary white--text">
        Website Settings
      </v-card-title>
      <div v-if="!restarting">
        <client-only>
          <VJsoneditor v-model="json" height="400px">

          </VJsoneditor>
        </client-only>
      </div>
        <div v-else>
          <h2 class="red pa-3 white--text ma-3">DO NOT RELOAD THIS PAGE WHILE THE SERVER IS RESTARTING.</h2>
          <h2 class="red pa-3 white--text ma-3">Reloading in 30 SEC..</h2>
        </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="save">
          Save & Restart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'
export default {
  name: "index",
  layout: "dashboard",
  async asyncData({app}){
    let data = await app.$axios.$get("/settings")
    return {
      json: data,
    }
  },
  data() {
    return {
      json: {},
      restarting: false
    }
  },
  methods: {
    async save(){
      await this.$axios.$post("/settings", this.json)
      this.showAlert("success", "Config Rewrite done. Restarting server.... Please wait 30sec. Do not reload.")
      this.restarting = true;
      setTimeout(function (){
        window.location.href = '/app/';
      }, 30000)
    }
  },
  components: {
    VJsoneditor
  }
}
</script>

<style scoped>

</style>
