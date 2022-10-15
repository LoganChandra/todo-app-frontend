/* eslint-disable */
import { createWebHistory, createRouter } from "vue-router";

// pages
import Todo from "./pages/Todo.vue";

const routes = [
  {
    path: "/",
    name: "Todo",
    component: Todo,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  if (to.name != "Todo") {
    next({
      path: "/",
    });
  }
  next()
});
export default router;
