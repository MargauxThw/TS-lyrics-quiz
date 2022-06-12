<template>
  <div id="app">
    <nav>
      <button @click="$route.name !== 'home' ? $router.push('/') : void 0">
        <i class="fa fa-home fa-lg"></i>
      </button>
      <h1>Taylor Swift Lyrics Quiz</h1>
      <button />
    </nav>
    <router-view v-if="fetched" />
    <!-- <bar-chart /> -->
  </div>
</template>

<script>
// import store from "./store";
import { mapGetters } from "vuex";
// import BarChart from "./components/BarChart.vue";

export default {
  name: "App",
  components: {
    // BarChart,
  },
  computed: {
    ...mapGetters({
      fetched: "getFetched",
    }),
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
body {
  max-width: 900px;
  margin: 0 auto;
  padding: 5% 5% 0% 5%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
nav {
  top: 0px;
  left: auto;
  position: absolute;
  min-height: 20px;
  width: 90%;
  // border-bottom: 2px solid black;
  // border-bottom: none;

  max-width: 900px;
  margin: 0 auto;
  // padding: 0 5%;

  h1 {
    font-size: 1em;
    margin-inline-start: 0;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
button {
  cursor: pointer;
  background-color: #181818;
  border-radius: 100%;
  height: 38px;
  width: 38px;
  // border: solid black 2px;
  border: none;
  margin: 0 8px;
  i {
    color: white;
  }
}
</style>
