<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>
          KYC Verification
        </v-card-title>
        <v-card-text>
          <p>
            Upload your Aadhaar card for KYC Verification.
          </p>
          <no-ssr>
            <v-file-input accept="image/*" label="Aadhar Card Font page" v-model="file1" counter show-size></v-file-input>
            <v-file-input accept="image/*" label="Aadhar Card Back page" v-model="file2" counter show-size></v-file-input>
          </no-ssr>
          Files Supported: jpg, png. MAX file size: 5MB
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="submit" :loading="loading">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    data(){

      return {
        file1: null,
        file2: null,
        loading: false
      }
    },

    methods: {
      async submit(){
        if(!process.browser) return;

        if (this.file1 && this.file2) {
          this.loading = true;
          let formData = new FormData();

          // files
            formData.append("image", this.file1, this.file1);
            formData.append("image", this.file2, this.file2);

          await this.$axios
            .post("/kyc/submit-kyc", formData)
            .then(response => {
              console.log("Success!");
              console.log({ response });
            })
            .catch(error => {
              console.log({ error });
            });
          this.loading = false;
          this.showAlert("success", "KYC Submitted. Now Please wait for approval");
          this.$router.push("/app");
        } else {
          this.showAlert("error", "You need to select Both Files.")
        }
      }
    }

  }
</script>

<style scoped>

</style>
