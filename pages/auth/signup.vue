<template>
  <v-layout class="bg" justify-center="" align-center="">
    <v-container>
      <v-card class="login-box">
        <v-card-title>
          <h1 class="headline">Create an Account</h1>
        </v-card-title>
        <v-form ref="form">
          <v-card-text>
            <v-text-field placeholder="Name" prepend-icon="mdi-account-circle" name="name" v-model="name" :rules="nameRules"/>
            <v-text-field placeholder="Username" prepend-icon="mdi-account-circle" name="username" v-model="username" :rules="usernameRules"/>
            <v-text-field placeholder="Email ID" prepend-icon="mdi-at" name="email" v-model="email" :rules="emailRules"/>
            <v-text-field placeholder="10 Digit Mobile Number" prepend-icon="mdi-cellphone-android" name="phone" v-model="phone" :rules="PhoneRules"/>
            <v-text-field placeholder="12 Digit Aadhaar Number" prepend-icon="mdi-card-account-details-outline" name="aadhaar" v-model="aadhaar" :rules="AadhaarRules"/>
            <no-ssr>
              <v-file-input accept="image/*" label="Aadhar Card Font page" v-model="file1" counter show-size></v-file-input>
              <v-file-input accept="image/*" label="Aadhar Card Back page" v-model="file2" counter show-size></v-file-input>
            </no-ssr>
            <v-select placeholder="State" prepend-icon="mdi-map-marker" name="Select State" type="text"
                          v-model="state" :items="states"/>
            <v-menu
              v-model="datePicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Date of Barth"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                @input="datePicker = false"
              ></v-date-picker>
            </v-menu>
            <v-text-field placeholder="Password" prepend-icon="mdi-form-textbox-password" name="password"
                          type="password" v-model="password" :rules="passRules"/>
            <v-text-field placeholder="Confirm Password" prepend-icon="mdi-form-textbox-password" name="password"
                          type="password" v-model="passwordc" :rules="passcRules"/>
            <v-text-field placeholder="Referral Code (Optional)" prepend-icon="mdi-at" name="Referral Code" v-model="refer" :disabled="referDisabled"/>
            <v-checkbox label="I agree to all Trams and conditions and Privacy Policy" :rules="tosRules">
              <template v-slot:label>
                <div>
                  I agree to all
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a
                        target="_blank"
                        href="/terms"
                        @click.stop
                        v-on="on"
                      >
                        Trams And Conditions
                      </a>
                    </template>
                    Opens in new window
                  </v-tooltip>
                  and
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a
                        target="_blank"
                        href="/privacy"
                        @click.stop
                        v-on="on"
                      >
                        Privacy Policy
                      </a>
                    </template>
                    Opens in new window
                  </v-tooltip>
                </div>
              </template>
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text color="success" to="/auth/login" width="auto">
              <v-icon left>mdi-login</v-icon>
              Login Instead
            </v-btn>

            <v-btn text color="info" @click="signup" :loading="loading">
              <v-icon left>mdi-account-plus-outline</v-icon>
              Sign Up
            </v-btn>

            <!--<v-btn flat color="error"> <v-icon left>mdi-account-question-outline</v-icon>Can't login?</v-btn>-->
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        date: null,
        datePicker: false,
        name: "",
        username: "",
        aadhaar: "",
        email: "",
        password: "",
        file1: null,
        file2: null,
        phone: "",
        refer: "",
        referDisabled: false,
        passwordc: "",
        state: "",
        states: [
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chattisgarh",
          "Delhi",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jammu and Kashmir",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Lakshadweep Islands",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Pondicherry",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal",
        ],
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters'
        ],
        usernameRules: [
          v => !!v || 'Username is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters',
          v => /^[a-z0-9]+(?:[_-]?[a-z0-9])*$/.test(v) || "Please enter valid username"
        ],
        PhoneRules: [
          v => !!v || 'Mobile is required',
          v => (v && v.length == 10) || 'Mobile must be 10 Correctors Long.',
          v => /^[7-9][0-9]{9}$/.test(v) || "Please enter valid Mobile number"
        ],
        AadhaarRules: [
          v => !!v || 'Aadhaar is required',
          v => (v && v.length == 12) || 'Aadhaar Number must be 12 Correctors Long.',
          v => /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/.test(v) || "Please enter valid Aadhaar number"
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
        ],
        tosRules: [
          v => !!v || 'Please accept TOS',
        ],
        passcRules: [
          v => !!v || "Please Enter Confirm Password",
          v => v === this.password || "Password Did'nt Match"
        ],
        passRules: [
          v => !!v || "Password is required",
          v => (v && v.length >= 6) || 'Password must be more than 6 characters',
          v => v === this.password || "Password Did'nt Match"
        ]
      }
    },
    methods: {
      async signup() {
        if (this.$refs.form.validate()) {
          if(!this.file1) return this.showAlert("error", "Select Aadhaar Font");
          if(!this.file2) return this.showAlert("error", "Select Aadhaar Back");
          let formData = new FormData();
          // files
          formData.append("image", this.file1, this.file1);
          formData.append("image", this.file2, this.file2);

          // Fields
          formData.append("username", this.username);
          formData.append("email", this.email);
          formData.append("name", this.name);
          formData.append("password", this.password);
          formData.append("refer", this.refer);
          formData.append("phone", this.phone);
          formData.append("state", this.state);
          formData.append("dob", this.date);
          formData.append("aadhaar", this.aadhaar);

          try {
            this.loading = true;
            // await this.$axios.post("/auth/signup", {username: this.username, email: this.email, name: this.name, password: this.password, refer: this.refer, phone: this.phone, state: this.state, dob: this.date, aadhaar: this.aadhaar});
            await this.$axios.post("/auth/signup", formData);
            this.showAlert("success", "SignUp Done!, Trying To Login...");
            setTimeout(() => {
              this.$store.dispatch("login", {username: this.username, password: this.password})
            }, 1000)
          } catch (e) {
            this.showAlert("error", e.response.data.message);
          }
          this.loading = false;
        }
      }
    },
    mounted() {
      let ref = this.$route.query.ref;
      if(ref) {
        this.refer = ref;
        this.referDisabled = true
      }
    },
    watch: {
      isLoggedIn(val) {
        if(val){
          this.$router.push("/app")
        }
      }
    },
    head() {
      return {
        title: `SignUp`
      }
    }
  }
</script>
<style scoped>
  .bg {
    background: #2d1a5a;
    min-height: 100%;
  }

  .login-box {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
