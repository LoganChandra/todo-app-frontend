import axios from "axios";
let API_URL = process.env.API_URL
console.log("process.env", process.env);
export default {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {},
  actions: {
    async get(context, payload) {
      let result = await axios
        .get(API_URL + `/${payload.route}`, { params: payload.queryStringParameters })
        .catch((err) => err);
      if (result && result.status != 200) {
        return result.data || {};
      }

      return result.data || [];
    },
    async post(context, payload) {
      let result = await axios
        .post(API_URL + `/${payload.route}`, payload.body)
        .catch((err) => err);
      if (result && result.status != 200) {
        return result.data || {};
      }

      return result.data || [];
    },
    async patch(context, payload) {
      let result = await axios
        .patch(API_URL + `/${payload.route}` + `/${payload.pathParam}`, payload.body)
        .catch((err) => err);
      if (result && result.status != 200) {
        return result.data || {};
      }

      return result.data || [];
    }
  },
  getters: {},
};
