<template>
  <div id="app">
    <nav>
      <h1
        @click="
          () => {
            $route.name !== 'home' ? navigate() : void 0;
          }
        "
        style="cursor: pointer"
      >
        Taylor Swift Lyrics Quiz
      </h1>
    </nav>
    <router-view v-if="fetched" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import store from "./store";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      fetched: "getFetched",
    }),
  },
  watch: {
    $route: function () {
      window.goatcounter.count(window.location.pathname);
      // store.commit("RESET_BOUND");
    },
  },
  methods: {
    navigate() {
      window.goatcounter.count({
        path: `Home via nav from: ${this.$route.name}`,
        title: "Navigation",
        event: true,
      });
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  top: 0px;
  left: 0px;
  position: absolute;
  min-height: 20px;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  h1 {
    font-size: 1em;
    margin-inline-start: 0;
  }
}
</style>
