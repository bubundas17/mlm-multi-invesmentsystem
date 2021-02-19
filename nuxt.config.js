const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + "The Truth Club",
    title: "The Truth Club" || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    script: [
      { src: 'https://checkout.razorpay.com/v1/checkout.js' },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@plugins/alerts",
    "@plugins/axios",
    "@plugins/mixins",
    // {src: "@plugins/loginRedirector", ssr: false},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-client-init-module'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    prefix: "/api/v1/",
    baseURI: "http://localhost:3000/",
    browserBaseURL: "/api/v1/",
    // browserBaseURL: "https://15e61786.ngrok.io/api/v1/",
    // baseURL: "http://localhost:3000"
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#4a148c",
          secondary: colors.red.base,
          accent: colors.blue.base,
          error: colors.deepOrange.base,
          warning: colors.amber.base,
          info: colors.cyan.base,
          success: colors.green.base
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    publicPath: "/assets/",
    standalone: true,
    extend(config, ctx) {

    }
  }
}
