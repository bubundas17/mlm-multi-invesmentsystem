export const state = () => ({
  totalTorrents: null,
  user: {},
  isLoggedIn: false,
  token: null,
  darkMode: false
});

export const mutations = {
  toggleDarkMode(state){
    state.darkMode = ! state.darkMode
  },
  user(state, payload) {
    state.user = payload
  },
  token(state, payload) {
    if (payload){
      return state.token = payload
    }
    state.token = null;
  },
  loggedIn(state, payload) {
    state.isLoggedIn = payload;
  },
};

export const actions = {
  async nuxtServerInit({commit, getters}, {app}) {
    try {
      let data = await app.$axios.$get("/auth/get-access-token");
      // console.log(data)
      commit("loggedIn", true);
      commit("user", data.user);
      commit("token", data.token);
      let user = await app.$axios.$get("/profile");
      commit("user", user.user);
      // app.$axios.setToken(data.token, 'Bearer')
    } catch (e) {
      commit("loggedIn", false);
      commit("user", {});
      commit("token", null);
      app.$axios.setToken(null, 'Bearer')
    }
  },
  nuxtClientInit({ commit , dispatch}, context) {
    // code
    setInterval(() => {
      console.log("refreshLogin call");
      dispatch("refreshLogin")
    }, 300000)
  },
  async login({commit, dispatch}, payload){
    try {
      let user = await this.$axios.post("/auth/login", {username: payload.username, password: payload.password});
      commit("token", user.data.token);
      // commit("user", user.data.user);
      dispatch("refreshUser")
      commit("loggedIn", true);
      dispatch("alert/show", {color: "success", message: "Logged User In!"})
    } catch (err) {
      dispatch("alert/show", {color: "error", message: "Please Check Your User id And Password"})
    }
  },
  async logout({commit}) {
    commit('user', {});
    commit("token", "");
    commit("loggedIn", false)
    await this.$axios.$get("/auth/logout")
  },

  async refreshUser({commit}){
    let user = await this.$axios.$get("/profile");
    commit("user", user.user);
  },

  async refreshLogin({commit, getters }){
    // this.$axios.get("/auth/refresh-token")
    //   .then(data => {
    //     commit("loggedIn", true);
    //     commit("user", data.data.user);
    //     commit("token", data.data.token);
    //     // app.$axios.setToken(data.data.token, 'Bearer')
    //   })
    //   .catch(err => {
        return this.$axios.get("/auth/get-access-token")
      // })
      .then(data => {
        commit("loggedIn", true);
        // commit("user", data.data.user);
        commit("token", data.data.token);
        // app.$axios.setToken(data.data.token, 'Bearer')
      }).catch(err => {
      commit('user', {});
      commit("token", "");
      commit("loggedIn", false)
      // app.$axios.setToken(null, 'Bearer')
    })
    // console.log(data)

  }
};

export const getters = {
  user: store => {
    return store.user
  },
  balance: store => {
    return store.user.balance || 0
  },
  isLoggedIn: store => {
    return store.isLoggedIn
  },
  token: store => {
    return store.token
  },
  loggedIn: store => {
    return store.isLoggedIn
  },
  admin: state => {
    return state.isLoggedIn && state.user.admin
  },
  darkMode: state => {
    return state.darkMode
  }
};

