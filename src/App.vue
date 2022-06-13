<template>
  <div id="app">
    <nav>
      <h1
        @click="$route.name !== 'home' ? $router.push('/') : void 0"
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
