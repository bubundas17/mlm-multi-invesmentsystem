// export default ({store, $axios}) => {
//   $axios.setToken(store.state.token)
// }


export default function ({ $axios, app, store }) {
  $axios.defaults.withCredentials = true;
  $axios.onRequest(config => {
    if (store.state.token) {
      config.headers.common['authorization'] = "Bearer " + store.state.token
    }
  })
}
