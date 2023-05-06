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
    <h3>
      You had an average of {{ avgSim }}% with {{ numCorrect }} line(s) 100%
      correct
    </h3>
    <bar-chart style="margin-bottom: 16px" />
    <a id="showResp" @click="triggerShowResp">{{
      !showingResp ? "Show your responses" : "Hide your responses"
    }}</a>
    <div v-if="showingResp">
      <song-answer-card
        v-for="(answer, index) in answers"
        :curr_line="answer"
        :num="index + 1"
        :key="index"
      />
    </div>
    <button
      class="nextButton filled"
      @click="playAgain()"
      style="margin-top: 20px"
    >
      PLAY AGAIN
    </button>
    <button
      class="nextButton outline"
      @click="home()"
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
import SongAnswerCard from "./components/SongAnswerCard.vue";

export default {
  name: "QuizPage",
  components: {
    SongCard,
    BarChart,
    SongAnswerCard,
  },
  data() {
    return {
      end: false,
      checking: false,
      showingResp: false,
    };
  },
  created() {
    this.end = false;
    this.checking = false;
    this.showingResp = false;
    store.commit("RESET_GAME");
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
      data: "getData",
      answers: "getAnswers",
    }),
  },
  methods: {
    triggerShowResp() {
      this.showingResp = !this.showingResp;
      if (this.showResp == true) {
        window.goatcounter.count({
          path: "Show Responses",
          title: "action",
          event: true,
        });
      }
    },
    home() {
      window.goatcounter.count({
        path: `Home button after`,
        title: "Navigation",
        event: true,
      });
      this.$router.push("/");
    },
    playAgain() {
      window.goatcounter.count({
        path: `Play again`,
        title: "Navigation",
        event: true,
      });
      this.$router.go();
    },
    checkPress() {
      this.checking = true;
      var similarity = this.similarity(this.input, this.curr_line.line.this);
      var song = `${this.curr_line.song} ${this.curr_line.line.section}`;
      var album = this.curr_line.album_num;
      store.commit("UPDATE_SIMILARITY", {
        curr_sim: similarity,
        song: song,
        album: album,
      });
      window.goatcounter.count({
        path: `Finished a question: ${this.title}`,
        title: "Finished a question",
        event: true,
      });
    },
    nextPress() {
      this.checking = false;
      store.commit("ADD_ANSWER", {
        question: this.curr_line,
        sim: this.curr_sim,
        input: this.input,
      });

      store.commit("UPDATE_INPUT", "");
      document.getElementsByClassName("this-line")[0].innerHTML = "";

      if (this.q_num == this.q_bound) {
        this.end = true;
        window.goatcounter.count({
          path: `Finished a quiz: ${this.title}`,
          title: "Finished a quiz",
          event: true,
        });
      } else {
        store.commit("PLAY_GAME", this.$route.params.mode);
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
#showResp {
  text-decoration: underline;
  font-weight: 600;
  color: #2c3e50;
  display: block;
}

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

.checkButton,
.nextButton {
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 24px;
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
</style>
