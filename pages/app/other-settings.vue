<template>
  <v-layout column class="ma-2">
    <v-flex xs12>
      <v-card>
        <v-card-title>Popup Settings</v-card-title>
        <v-card-text>
          <v-checkbox label="Enable Dashboard Popup"  v-model="settings.popup.enabled"></v-checkbox>
          <v-textarea placeholder="Popup Text" v-model="settings.popup.text">

          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer/><v-btn color="secondary" @click="save">Save All</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card class="mt-3">
        <v-card-title>Promotion</v-card-title>
        <v-card-text>
          <v-text-field label="Bonus Image link" v-model="settings.promotion.bonus"></v-text-field>
          <v-text-field label="Future Goal Image link" v-model="settings.promotion.future"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/><v-btn color="secondary" @click="save">Save All</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card class="mt-3">
        <v-card-title>Zodiac Sign Spin Text</v-card-title>
        <v-card-text>
          <v-text-field label="Aries" v-model="settings.zodiac.aries"></v-text-field>
          <v-text-field label="Taurus"  v-model="settings.zodiac.taurus"></v-text-field>
          <v-text-field label="Gemini"  v-model="settings.zodiac.gemini"></v-text-field>
          <v-text-field label="Cancer" v-model="settings.zodiac.cancer" ></v-text-field>
          <v-text-field label="Leo"  v-model="settings.zodiac.leo"></v-text-field>
          <v-text-field label="Virgo"  v-model="settings.zodiac.virgo"></v-text-field>
          <v-text-field label="Libra" v-model="settings.zodiac.libra"></v-text-field>
          <v-text-field label="Scorpio" v-model="settings.zodiac.scorpio"></v-text-field>
          <v-text-field label="Sagittarius" v-model="settings.zodiac.sagittarius"></v-text-field>
          <v-text-field label="Capricorn" v-model="settings.zodiac.capricorn"></v-text-field>
          <v-text-field label="Aquarius" v-model="settings.zodiac.aquarius"></v-text-field>
          <v-text-field label="Pisces" v-model="settings.zodiac.pisces"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/><v-btn color="secondary" @click="save">Save All</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "other-settings.vue",
  layout: "dashboard",
  async asyncData({app}) {
    try {
      let settings = await app.$axios.$get("/settings/other")
      return {settings}
    } catch (e) {
      return {}
    }
  },
  data() {
    return {
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
  methods: {
    save() {
      this.$axios.$post("/settings/other", this.settings).then(data => {
        this.showAlert("success", "Settings updated.")
      }).catch(err => {
        this.showAlert("error", "error in updating.")
      })
    }
  }
}
</script>

<style scoped>

</style>
