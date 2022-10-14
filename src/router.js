/* eslint-disable */
import { createWebHistory, createRouter } from "vue-router";

// pages
import Home from "./pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  console.log("to, from", to, from);
  if (to.name != "Home") {
    next({
      path: "/",
    });
  }
  next()
});
export default router;
