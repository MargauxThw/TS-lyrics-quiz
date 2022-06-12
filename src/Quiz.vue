<template>
  <div id="quiz" v-if="!end">
    <h2>Quiz: {{ title }}</h2>
    <p>
      Question: <b>{{ q_num }} / {{ q_bound }}</b>
    </p>
    <p>
      Average Accuracy: <b>{{ avgSim }}%</b>
    </p>
    <song-card @pressEnter="checkPress" v-if="!checking" />
    <song-card @pressEnter="nextPress" v-else />
    <p v-if="checking">
      Correct Lyrics: <b>{{ curr_line.line.this }}</b>
    </p>
    <p v-if="checking">
      Your Lyrics: <b>{{ input }}</b>
    </p>
    <p v-if="checking">
      Score: <b>{{ curr_sim }}% accurate</b>
    </p>

    <button v-if="!checking" @click="checkPress">CHECK</button>
    <button v-if="checking" @click="nextPress">NEXT LYRICS</button>
  </div>
  <div id="quiz" v-else>
    <h3>Congratulations! You just finished:</h3>
    <h2>{{ title }}</h2>
    <!-- Maybe have a graph below? With best album and worst album or something too? -->
    <h3>
      You had an average of {{ avgSim }}% with {{ numCorrect }} line(s) 100%
      correct
    </h3>
    <bar-chart />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SongCard from "./components/SongCard.vue";
import BarChart from "./components/BarChart.vue";
import store from "./store";

export default {
  name: "QuizPage",
  components: {
    SongCard,
    BarChart,
  },
  data() {
    return {
      end: false,
      checking: false,
    };
  },
  created() {
    this.end = false;
    this.checking = false;
    store.commit("RESET_GAME");
    store.commit("PLAY_GAME", parseInt(this.$route.params.mode));
  },
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
      fetched: "getFetched",
    }),
  },
  methods: {
    // startPress(mode) {
    //   store.commit("RESET_GAME");
    //   store.commit("PLAY_GAME", mode);
    //   this.started = true;
    // },
    checkPress() {
      this.checking = true;
      var similarity = this.similarity(this.input, this.curr_line.line.this);
      var song = `${this.curr_line.song} ${this.curr_line.line.section}`;
      var album = this.curr_line.album_num;
      console.log(this.curr_line);
      console.log("INITIAL", song);
      store.commit("UPDATE_SIMILARITY", {
        curr_sim: similarity,
        song: song,
        album: album,
      });
    },
    nextPress() {
      this.checking = false;
      store.commit("UPDATE_INPUT", "");
      document.getElementsByClassName("this-line")[0].innerHTML = "";

      if (this.q_num == this.q_bound) {
        this.end = true;
      } else {
        store.commit("PLAY_GAME", this.mode);
        console.log(this.curr_line);
      }
    },
    editDistance(s1, s2) {
      s1 = s1.toLowerCase().replaceAll('"', "'");
      s2 = s2.toLowerCase().replaceAll('"', "'");

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue =
                  Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    },
    similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      var similarity =
        ((longerLength - this.editDistance(longer, shorter)) /
          parseFloat(longerLength)) *
        100;

      similarity = Math.round((similarity + Number.EPSILON) * 100) / 100;
      return similarity;
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
.button-menu {
  border-top: 2px solid black;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
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
  }
}
</style>
