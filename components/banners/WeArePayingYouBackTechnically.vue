<template>
  <div class="grey lighten-3 py-12">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 md12>
          <h2 class="text-center my-4 headline">We're Paying Back Technically...</h2>
          <p class="text-center">World's most responsible blockchain.</p>
        </v-flex>

        <v-flex xs12 sm6 md4 d-flex>
          <v-card class="pa-3 ma-4">
            <v-card-text>
              <v-layout column class="">
                <div class="d-flex justify-center">
                  <v-avatar :size="80" color="teal" dark>
                    <v-icon large class="white--text">mdi-heart-multiple-outline</v-icon>
                  </v-avatar>
                </div>
                <h3 class="text-center mb-1 mt-5">SAFE</h3>
                <p class="text-center">We don’t hold your deposits, so your funds are never vulnerable to hacks.</p>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md4 d-flex>
          <v-card class="pa-3 ma-4">
            <v-card-text>
              <v-layout column class="">
                <div class="d-flex justify-center">
                  <v-avatar :size="80" color="orange darken-2" dark>
                    <v-icon large class="white--text">mdi-shield-lock</v-icon>
                  </v-avatar>
                </div>
                <h3 class="text-center mb-1 mt-5">Secure Encryption</h3>
                <p class="text-center">The world's most advanced and future proof encryption that keeps your data
                  safe.</p>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md4 d-flex>
          <v-card class="pa-3 ma-4">
            <v-card-text>
              <v-layout column class="">
                <div class="d-flex justify-center">
                  <v-avatar :size="80" color="deep-purple" dark>
                    <v-icon large class="white--text">mdi-lightbulb-on-outline</v-icon>
                  </v-avatar>
                </div>
                <h3 class="text-center mb-1 mt-5">User Experience</h3>
                <p class="text-center">Dealing with our coin , through our platform is a hassle free and easy process.</p>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
  export default {
    name: "WeArePayingYouBackTechnically"
  }
</script>

<style scoped>

</style>
