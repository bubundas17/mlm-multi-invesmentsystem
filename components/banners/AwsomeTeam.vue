<template>
  <div class="py-12">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 md12>
          <h2 class="text-center my-4 headline">Awesome Team</h2>
          <p class="text-center">The Ample Coin Team combines a passion for IT, industry expertise & proven record
            in marketing.</p>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-card class="ma-4">
            <v-responsive :aspect-ratio="1">
              <v-img :src="require('@/assets/images/almaan-qureshi.jpg')"></v-img>
            </v-responsive>
            <v-card-text class="pa-3">
              <v-layout column class="">
                <h3 class="text-center mb-3 mt-5">Mohd Almaan Qureshi</h3>
                <p class="text-center mb-0">Company MD</p>
                <p class="text-center">+91 8218-7000-83</p>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-card class="ma-4">
            <v-responsive :aspect-ratio="1">
              <v-img :src="require('@/assets/images/lokesh.jpg')"></v-img>
            </v-responsive>
            <v-card-text class="pa-3">
              <v-layout column class="">
                <h3 class="text-center mb-3 mt-5">Lokesh Pal (Bhopal MP)</h3>
                <p class="text-center mb-0">Core Member</p>
                <p class="text-center">+91 8770-2917-52</p>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>


        <v-flex xs12 sm6 md3>
          <v-card class="ma-4">
            <v-responsive :aspect-ratio="1">
              <v-img :src="require('@/assets/images/angad.jpg')"></v-img>
            </v-responsive>
            <v-card-text class="pa-3">
              <v-layout column class="">
                <h3 class="text-center mb-3 mt-5">Angad Sood (Punjab)</h3>
                <p class="text-center mb-0">Core Member</p>
                <p class="text-center">+91 8770-2917-52</p>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md3>
          <v-card class="ma-4">
            <v-responsive :aspect-ratio="1">
              <v-img :src="require('@/assets/images/sandeep.jpg')"></v-img>
            </v-responsive>
            <v-card-text class="pa-3">
              <v-layout column class="">
                <h3 class="text-center mb-3 mt-5">Sandeep Kumar (Haryana)</h3>
                <p class="text-center mb-0">Core Member</p>
                <p class="text-center">+91 7015-9544-72</p>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 md12>
          <p class="text-center mt-4">Contact Core Members To Purchase Coin</p>
          <p class="text-center mt-4"><img src="../../assets/images/logo.png" alt="" width="35px" class="mb-n3 mr-2">Current
            AMP to INR rate: 2.5 INR </p>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: "AwesomeTeam"
  }
</script>

<style scoped>

</style>
