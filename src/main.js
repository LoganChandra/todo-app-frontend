// APP
import { createApp } from "vue";
import App from "./App.vue";

// CSS
import "./styles/app.css";

// ROUTER
import router from "./router";

// VUE STORE
import store from "./store/index.js";

// VUESTIC
import { createVuestic } from 'vuestic-ui'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(createVuestic())
app.mount("#app");
