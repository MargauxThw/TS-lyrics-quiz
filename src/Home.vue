<template>
  <div id="home">
    <h2>Welcome to the Taylor Swift Lyrics Quiz!</h2>
    <p>
      Think you know all the songs? Test your knowledge with these
      finish-the-lyric-style quizzes!
    </p>
    <p>
      <b>Disclaimer:</b> These are probably the toughest Taylor Swift lyrics
      quizzes that you will find on the internet, proceed with caution...
    </p>
    <div class="button-menu">
      <button @click="startPress(0)" class="other">
        💃💃 Play with friends 💃💃
      </button>
      <button @click="startPress(1)" class="other">
        🤓 Freeplay - 13 lines 🤓
      </button>
      <button @click="startPress(2)" class="other">
        🥳 Sing it in the chorus 🥳
      </button>
      <button @click="startPress(3)" class="other">
        😤 Let it out in the verse 😤
      </button>
      <button @click="startPress(4)" class="other">🏆 Bridgeageddon 🏆</button>
      <button @click="startPress(5)" class="other">
        😍 We love a pre-chorus 😍
      </button>
      <button @click="startPress(6)" class="other">
        🌅 Sacred (new) beginnings 🌅
      </button>
      <button @click="startPress(7)" class="other">
        📖 Endings we'd never change 📖
      </button>
      <button @click="startPress(8)" class="evermore">evermore</button>
      <button @click="startPress(9)" class="folklore">folklore</button>
      <button @click="startPress(10)" class="lover">Lover</button>
      <button @click="startPress(11)" class="reputation">Reputation</button>
      <button @click="startPress(12)" class="nineteen">1989</button>
      <button @click="startPress(13)" class="red">Red</button>
      <button @click="startPress(14)" class="speak">Speak now</button>
      <button @click="startPress(15)" class="fearless">Fearless</button>
      <button @click="startPress(16)" class="debut">Debut</button>
    </div>
    <p>
      <b>Note:</b> All of these quizzes (except 'Play with friends') are
      autogenerated each time, so you can play them over and over again!
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      started: true,
      checking: false,
      end: false,
    };
  },
  created() {
    this.checking = false;
    this.started = false;
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
    }),
  },
  methods: {
    startPress(mode) {
      if (mode == 0) {
        this.$router.push({ name: "friends" });
      } else {
        this.$router.push({ name: "quiz", params: { mode: mode } });
      }
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
