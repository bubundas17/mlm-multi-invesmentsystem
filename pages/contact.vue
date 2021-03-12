<template>
  <v-layout
    column
  >
<!--    <top-hero/>-->
    <div>
      <v-container>
        <div class="full col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h2>Contact Us</h2>


          <h5>Last Updated: April 19, 2020</h5>
          <hr>
          <div class="col">
            <div class="col">
        <p>Use the email below to contact out support. Please send support email only from your registered email ID.</p>
        <p>Support Email: support@thetruthclub.in</p>
              </div>        

    
      </div>

          

        </div>
      </v-container>

    </div>
  </v-layout>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'
  import TopHero from "../components/TopHero";

  export default {
    components: {
      TopHero,
      Logo,
      VuetifyLogo
    }
  }
</script>


