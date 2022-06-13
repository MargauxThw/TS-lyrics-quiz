<template>
  <div id="friends">
    <h2>Play with friends</h2>
    <p>
      Want to find out who knows the lyrics better once and for all? We've
      generated 13 quizzes that will be the same everytime so that you and your
      friends can play the same quiz and compare scores!
    </p>
    <p>
      <b>Disclaimer:</b> For now, these quizzes were still randomly generated
      from all Taylor Swift songs and sections - so if there are any repeats or
      boring quizzes, apologies 😢
    </p>
    <div class="button-menu">
      <button
        v-for="index in 13"
        :key="index"
        class="other"
        @click="startPress(index)"
      >
        Quiz {{ index }}
      </button>
    </div>
    <p>
      <b>Note:</b> All of these quizzes are preset, so they will be the same
      each time
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FriendsMenu",
  //   data() {
  //     return {
  //       started: true,
  //       checking: false,
  //       end: false,
  //     };
  //   },
  //   created() {
  //     this.checking = false;
  //     this.started = false;
  //   },
  computed: {
    ...mapGetters({
      curr_line: "getCurrentLine",
      input: "getInput",
      curr_sim: "getCurrentSimilarity",
      mode: "getMode",
      title: "getTitle",
      q_num: "getQNum",
      q_bound: "getQBound",
      avgSim: "getAvgSim",
      numCorrect: "getNumCorrect",
    }),
  },
  methods: {
    startPress(mode) {
      this.$router.push({
        name: "friends-quiz",
        params: { mode: mode, friends: true },
      });
    },
  },
};
</script>

<style lang="scss">
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
.button-menu {
  // border-top: 2px solid lightgrey;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(
      45deg,
      #f79533,
      #f37055,
      #ef4e7b,
      #a166ab,
      #5073b8,
      #1098ad,
      #07b39b,
      #6fba82
    )
    1;
  border-image-slice: 1 0 1 0;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    cursor: pointer;
    margin: 0px auto;
    max-width: 600px;
    width: 100%;
    padding: 12px;

    font-size: 1em;
    font-style: bold;
    color: white;
    background-color: black;
    border-radius: 8px;
    border: none;
    outline: none;
    :focus {
      border: 1px solid black;
    }
  }
}
</style>
