import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import Home from "./Home";
import Quiz from "./Quiz";
import Friends from "./Friends";
import store from "./store";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/friends", name: "friends", component: Friends },
  {
    path: "/friends/quiz/:mode",
    name: "friends-quiz",
    component: Quiz,
    props: true,
  },
  {
    path: "/daily-quiz",
    name: "daily-quiz",
    component: Quiz,
  },
  {
    path: "/eras-quiz",
    name: "eras-quiz",
    component: Quiz,
  },
  { path: "/quiz/:mode", name: "quiz", component: Quiz, props: true },
  { path: "*", component: Home },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

store.dispatch("FETCH_DATA").then(
  new Vue({
    store,
    router,
    render: (h) => h(App),
  }).$mount("#app")
);

export default router;
