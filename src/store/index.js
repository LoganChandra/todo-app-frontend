import { createStore } from "vuex";

// MODULES
import api from "./api/api.module.js";
import todo from "./todo/todo.module.js"

export default createStore({
  modules: { api, todo },
  plugins: [],
});
