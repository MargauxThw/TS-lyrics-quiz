<template>
  <div id="quiz" v-if="!end">
    <h2>Quiz: {{ title }}</h2>
    <div id="scores">
      <p>
        <b>Q{{ q_num }} / {{ q_bound }}</b>
      </p>
      <p>
        Average accuracy: <b>{{ avgSim }}%</b>
      </p>
    </div>
    <song-card @pressEnter="checkPress" v-if="!checking" />
    <song-card @pressEnter="nextPress" v-else />
    <button
      class="checkButton"
      v-if="!checking"
      @click="checkPress"
      :class="$store.getters.getAlbumCol(curr_line.album_num)"
    >
      CHECK
    </button>
    <button
      class="nextButton"
      v-if="checking"
      @click="nextPress"
      :class="$store.getters.getAlbumCol(curr_line.album_num)"
    >
      NEXT LYRICS
    </button>
    <p v-if="checking">
      Correct Lyrics: <b>{{ curr_line.line.this }}</b>
    </p>
    <p v-if="checking">
      Your Lyrics: <b>{{ input }}</b>
    </p>
    <p v-if="checking">
      Score: <b>{{ curr_sim }}% accurate</b>
    </p>
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
    <button
      class="nextButton filled"
      @click="$router.go()"
      style="margin-top: 50px"
    >
      PLAY AGAIN
    </button>
    <button
      class="nextButton outline"
      @click="$router.push('/')"
      style="margin-top: 10px; margin-bottom: 50px"
    >
      RETURN HOME
    </button>
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
    console.log(this.$route.params);
    store.commit("PLAY_GAME", this.$route.params.mode);
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
        store.commit("PLAY_GAME", this.$route.params.mode);
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
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 50px;
// }
// body {
//   max-width: 900px;
//   margin: 0 auto;
//   padding: 5% 5% 0% 5%;
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
//     sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
// }
#scores {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  p {
    margin-block: 0;
  }
}
// .button-menu {
//   border-top: 2px solid black;
//   padding: 20px 0;
//   display: flex;
//   flex-direction: column;
//   gap: 8px;

//   button {
//     margin: 0px auto;
//     max-width: 600px;
//     width: 100%;
//     padding: 12px;

//     font-size: 1em;
//     font-style: bold;
//     color: white;
//     background-color: black;
//     border-radius: 8px;
//     border: none;
//     outline: none;
//   }
// }

.checkButton,
.nextButton {
  // box-shadow: inset 0px 1px 0px 0px #ffffff;
  // background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
  // background-color: rgb(174, 30, 73) !important;
  border-radius: 6px;
  // border: 1px solid #2c3e50;
  margin-top: -20px;
  border: none;
  // display: inline-block;
  cursor: pointer;
  // color: #2c3e50;
  color: white;
  // font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 24px;
  // text-decoration: none;
  // text-shadow: 0px 1px 0px #ffffff;
  width: 100%;
  max-width: 600px;
  box-shadow: none !important;
}

.outline {
  border: 2px solid #2c3e50;
  background: white;
  color: #2c3e50;
}
.filled {
  border: 2px solid #2c3e50;
  background: #2c3e50;
  color: white;
}
// .myButton {
//   cursor: pointer;
//   margin: 0px auto;
//   max-width: 600px;
//   width: 100%;
//   padding: 12px;

//   font-size: 1em;
//   font-style: bold;
//   color: black;
//   border-color: black;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   // border: none;
//   outline: none;
//   :focus {
//     border: 1px solid black;
//   }
// }
// .myButton:hover {
//   background: linear-gradient(to bottom, #e9e9e9 5%, #f9f9f9 100%);
//   background-color: #e9e9e9;
// }
// .myButton:active {
//   position: relative;
//   top: 1px;
// }
</style>
