import Vue from "vue";
import Vuex from "vuex";
import seeds from "@/assets/seeded.js";
import router from "@/main";

Vue.use(Vuex);

function datediff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function parseDate(str) {
  var mdy = str.split("/");
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function getDiff() {
  return datediff(
    parseDate("5/5/2023"),
    parseDate(
      new Date()
        .toLocaleString("en-US", {
          timeZone: "America/New_York",
        })
        .split(", ")[0]
    )
  );
}

export default new Vuex.Store({
  state: {
    data: {},
    daily_data: {},
    answers: [],
    fetched: false,
    quiz_seeds: seeds,
    albumOrder: [
      "The Life of a Showgirl",
      "The Tortured Poets Department",
      "midnights",
      "evermore",
      "folklore",
      "Lover",
      "Reputation",
      "1989 (Taylor's Version)",
      "Red (Taylor's Version)",
      "Speak Now (Taylor's Version)",
      "Fearless (Taylor's Version)",
      "Taylor Swift",
      "Unspecified Album",
    ],
    albumCols: [
      "tloasg",
      "ttpd",
      "midnights",
      "evermore",
      "folklore",
      "lover",
      "reputation",
      "nineteen",
      "red",
      "speak",
      "fearless",
      "debut",
      "other",
    ],
    current_line: {},
    input: "",
    similarities: [],
    songs: [], // 'Cardigan [Verse]'
    albums: [], // 0 => midnights
    mode: 0,
    q_num: 0,
    q_bound: 13,
    quizNames: [
      "Play with friends",
      "Freeplay - 13 lines",
      "Sing it in the chorus",
      "Let it out in the verse",
      "Bridgeageddon",
      "We love a pre-chorus",
      "Sacred (new) beginnings",
      "Endings we'd never change",
      "The Life of a Showgirl",
      "The Tortured Poets Department",
      "Midnights",
      "evermore",
      "folklore",
      "Lover",
      "Reputation",
      "1989 (Taylor's Version)",
      "Red (Taylor's Version)",
      "Speak Now (Taylor's Version)",
      "Fearless (Taylor's Version)",
      "Taylor Swift (Debut)",
    ],
  },
  getters: {
    getData: (state) => {
      return state.data;
    },
    getAlbum: (state) => (ind) => {
      const album_name = state.albumOrder[ind];
      return state.data[album_name];
    },
    getAlbumName: (state) => (ind) => {
      return state.albumOrder[ind];
    },
    getAlbumCol: (state) => (ind) => {
      return state.albumCols[ind];
    },
    getCurrentLine: (state) => {
      return state.current_line;
    },
    getInput: (state) => {
      return state.input;
    },
    getCurrentSimilarity: (state) => {
      return state.similarities[state.similarities.length - 1];
    },
    getMode: (state) => {
      return state.mode;
    },
    getTitle: (state) => {
      let dailyNum = getDiff();
      if (router.currentRoute.name == "friends-quiz") {
        return `Play with friends - Quiz ${state.mode}`;
      } else if (
        router.currentRoute.name == "daily-quiz" &&
        state.q_bound == 5
      ) {
        return `Daily Quiz #${dailyNum}`;
      } else if (
        router.currentRoute.name == "eras-quiz" &&
        state.q_bound == 9
      ) {
        return `Eras tour`;
      } else {
        return state.quizNames[state.mode];
      }
    },
    getAvgSim: (state) => {
      if (state.similarities.length == 0) {
        return "~";
      }
      var sum = 0;
      for (var i = 0; i < state.similarities.length; i++) {
        sum += state.similarities[i];
      }
      var avg = sum / state.similarities.length;
      avg = Math.round((avg + Number.EPSILON) * 100) / 100;
      return avg;
    },
    getQNum: (state) => {
      return state.q_num;
    },
    getQBound: (state) => {
      return state.q_bound;
    },
    getFetched: (state) => {
      return state.fetched;
    },
    getNumCorrect: (state) => {
      var nc = 0;
      for (var i = 0; i < state.similarities.length; i++) {
        if (state.similarities[i] == 100) {
          nc++;
        }
      }
      return nc;
    },
    getSimilarities: (state) => {
      return state.similarities;
    },
    getSongs: (state) => {
      return state.songs;
    },
    getAlbums: (state) => {
      return state.albums;
    },
    getChartCols: (state) => {
      const outlines = [
        "rgb(121, 229, 172)",
        "rgb(36, 31, 28)",
        "rgb(2, 15, 58)",
        "rgb(254, 140, 0)",
        "rgb(135, 135, 135)",
        "rgb(255, 168, 255)",
        "rgb(79, 124, 81)",
        "rgb(142, 186, 251)",
        "rgb(174, 30, 73)",
        "rgb(152, 99, 220)",
        "rgb(255, 186, 82)",
        "rgb(58, 166, 237)",
        "rgb(0, 0, 0)",
      ];
      const insides = [
        "rgba(121, 229, 172, 0.5)",
        "rgba(36, 31, 28, 0.5)",
        "rgba(2, 15, 58, 0.5)",
        "rgba(254, 140, 0, 0.5)",
        "rgba(135, 135, 135, 0.5)",
        "rgba(255, 168, 255, 0.5)",
        "rgba(79, 124, 81, 0.5)",
        "rgba(142, 186, 251, 0.5)",
        "rgba(174, 30, 73, 0.5)",
        "rgba(152, 99, 220, 0.5)",
        "rgba(255, 186, 82, 0.5)",
        "rgba(58, 166, 237, 0.5)",
        "rgba(0, 0, 0, 0.5)",
      ];
      var ordered_insides = [];
      var ordered_outlines = [];

      for (var i = 0; i < state.albums.length; i++) {
        ordered_insides.push(insides[state.albums[i]]);
        ordered_outlines.push(outlines[state.albums[i]]);
      }

      return { outlines: ordered_outlines, insides: ordered_insides };
    },
    getAnswers: (state) => {
      return state.answers;
    },
    getDailyNum: () => {
      return getDiff();
    },
    getDailyData: () => {
      let keys = Object.keys(localStorage);
      let scores = [];
      let chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].startsWith("daily_")) {
          if (JSON.parse(localStorage.getItem(keys[i])).avgSim == 100) {
            scores.push(99);
          } else {
            scores.push(JSON.parse(localStorage.getItem(keys[i])).avgSim);
          }
        }
      }

      for (let i = 0; i < scores.length; i++) {
        chartData[Math.floor(scores[i] / 10)] += 1;
      }

      return chartData;
    },
    getNumPlayed: () => {
      return Object.keys(localStorage).filter((k) => k.startsWith("daily_"))
        .length;
    },
    getCurrStreak: () => {
      let today = getDiff();

      let chunks = [];
      let prev = undefined;

      Object.keys(localStorage)
        .filter((k) => k.startsWith("daily_"))
        .map((n) => Number.parseInt(n.split("_")[1]))
        .sort()
        .forEach((current) => {
          if (prev === undefined || current - prev != 1) chunks.push([]);
          chunks[chunks.length - 1].push(current);
          prev = current;
        });

      return chunks.filter((c) => c.includes(today))[0].length;
    },
    getLongestStreak: () => {
      let chunks = [];
      let prev = undefined;

      Object.keys(localStorage)
        .filter((k) => k.startsWith("daily_"))
        .map((n) => Number.parseInt(n.split("_")[1]))
        .sort()
        .forEach((current) => {
          if (prev === undefined || current - prev != 1) chunks.push([]);
          chunks[chunks.length - 1].push(current);
          prev = current;
        });

      chunks.sort((a, b) => b.length - a.length);

      return chunks[0].length;
    },
  },
  mutations: {
    ADD_ANSWER(state, answer) {
      state.answers.push(answer);
    },
    SET_DATA(state, data) {
      for (var i = 0; i < state.albumOrder.length; i++) {
        Vue.set(state.data, state.albumOrder[i], data[state.albumOrder[i]]);
      }
      if (localStorage) {
        Vue.set(state.data, "daily_data", localStorage);
      }
      state.fetched = true;
    },
    GET_RANDOM_LINE(state) {
      const full_obj = {};
      var random = Math.floor(Math.random() * state.albumOrder.length);
      const r_album = state.data[state.albumOrder[random]];
      full_obj.album = state.albumOrder[random];
      full_obj.album_num = random;

      random = Math.floor(Math.random() * Object.keys(r_album).length);
      const r_song = r_album[Object.keys(r_album)[random]];
      full_obj.song = Object.keys(r_album)[random];

      random = Math.floor(Math.random() * Object.keys(r_song).length);
      const r_line = r_song[Object.keys(r_song)[random]];

      full_obj.line = r_line;

      Vue.set(state, "current_line", full_obj);
    },
    GET_LINE_FROM(state, section) {
      const full_obj = {};
      var random = Math.floor(Math.random() * state.albumOrder.length);
      const r_album = state.data[state.albumOrder[random]];
      full_obj.album = state.albumOrder[random];
      full_obj.album_num = random;

      random = Math.floor(Math.random() * Object.keys(r_album).length);
      while (
        r_album[Object.keys(r_album)[random]].every((line) => {
          if (!line.section.includes(section)) {
            return true; // No section in the chosen song
          } else {
            return false;
          }
        })
      ) {
        random = Math.floor(Math.random() * Object.keys(r_album).length);
      }
      const r_song = r_album[Object.keys(r_album)[random]];
      full_obj.song = Object.keys(r_album)[random];

      random = Math.floor(Math.random() * Object.keys(r_song).length);
      while (!r_song[Object.keys(r_song)[random]].section.includes(section)) {
        random = Math.floor(Math.random() * Object.keys(r_song).length);
      }
      const r_line = r_song[Object.keys(r_song)[random]];
      full_obj.line = r_line;

      Vue.set(state, "current_line", full_obj);
    },
    GET_LINE_FROM_ALBUM(state, ind) {
      const full_obj = {};
      var random = Math.floor(Math.random() * state.albumOrder.length);
      const r_album = state.data[state.albumOrder[ind]];
      full_obj.album = state.albumOrder[ind];
      full_obj.album_num = ind;

      random = Math.floor(Math.random() * Object.keys(r_album).length);
      const r_song = r_album[Object.keys(r_album)[random]];
      full_obj.song = Object.keys(r_album)[random];

      random = Math.floor(Math.random() * Object.keys(r_song).length);
      const r_line = r_song[Object.keys(r_song)[random]];

      full_obj.line = r_line;

      Vue.set(state, "current_line", full_obj);
    },
    GET_FRIEND_LINE(state, q) {
      Vue.set(
        state,
        "current_line",
        state.quiz_seeds.seeds[state.mode - 1][[q - 1]]
      );
    },
    GET_DAILY_LINE(state, seed) {
      let r = new Math.seedrandom(seed).quick();
      const full_obj = {};
      var random = Math.floor(r * state.albumOrder.length);
      const r_album = state.data[state.albumOrder[random]];
      full_obj.album = state.albumOrder[random];
      full_obj.album_num = random;

      random = Math.floor(r * Object.keys(r_album).length);
      const r_song = r_album[Object.keys(r_album)[random]];
      full_obj.song = Object.keys(r_album)[random];

      random = Math.floor(r * Object.keys(r_song).length);
      const r_line = r_song[Object.keys(r_song)[random]];

      full_obj.line = r_line;

      Vue.set(state, "current_line", full_obj);
    },
    GET_ERAS_LINE(state, ind) {
      var setlist = [
        {
          album: "Lover",
          songs: [
            "Miss Americana & The Heartbreak Prince",
            "Cruel Summer",
            "The Man",
            "You Need To Calm Down",
            "Lover",
            "The Archer",
          ],
        },
        {
          album: "Fearless (Taylor's Version)",
          songs: [
            "Fearless (Taylor's Version)",
            "You Belong With Me (Taylor's Version)",
            "Love Story (Taylor's Version)",
          ],
        },
        {
          album: "evermore",
          songs: [
            "'tis the damn season",
            "willow",
            "marjorie",
            "champagne problems",
            "tolerate it",
          ],
        },
        {
          album: "Reputation",
          songs: [
            "...Ready For It?",
            "Delicate",
            "Don't Blame Me",
            "Look What You Made Me Do",
          ],
        },
        {
          album: "Speak Now (Taylor's Version)",
          songs: [
            "Enchanted (Taylor's Version)",
            "Long Live (Taylor's Version)",
          ],
        },
        {
          album: "Red (Taylor's Version)",
          songs: [
            "22 (Taylor's Version)",
            "We Are Never Ever Getting Back Together (Taylor's Version)",
            "I Knew You Were Trouble (Taylor's Version)",
            "All Too Well (10 Minute Version) (Taylor's Version) [From the Vault]",
          ],
        },
        {
          album: "folklore",
          songs: [
            "seven",
            "the 1",
            "betty",
            "the last great american dynasty",
            "august",
            "illicit affairs",
            "my tears ricochet",
            "cardigan",
          ],
        },
        {
          album: "1989 (Taylor's Version)",
          songs: [
            "Style (Taylor's Version)",
            "Blank Space (Taylor's Version)",
            "Shake It Off (Taylor's Version)",
            "Wildest Dreams (Taylor's Version)",
            "Bad Blood (Taylor's Version)",
          ],
        },
        {
          album: "midnights",
          songs: [
            "Lavender Haze",
            "Anti‐Hero",
            "Midnight Rain",
            "Vigilante Shit",
            "Bejeweled",
            "Mastermind",
            "Karma",
          ],
        },
      ];
      const full_obj = {};

      const r_album = state.data[setlist[ind - 1].album];
      full_obj.album = setlist[ind - 1].album;
      full_obj.album_num = state.albumOrder.indexOf(setlist[ind - 1].album);

      let random = Math.floor(Math.random() * setlist[ind - 1].songs.length);
      const r_song = r_album[setlist[ind - 1].songs[random]];
      full_obj.song = setlist[ind - 1].songs[random];

      random = Math.floor(Math.random() * Object.keys(r_song).length);
      const r_line = r_song[Object.keys(r_song)[random]];

      full_obj.line = r_line;

      Vue.set(state, "current_line", full_obj);
    },
    UPDATE_INPUT(state, input) {
      state.input = input;
    },
    UPDATE_SIMILARITY(state, data) {
      state.similarities.push(data.curr_sim);
      state.songs.push(data.song);
      state.albums.push(data.album);
    },
    PLAY_GAME(state, mode) {
      state.mode = parseInt(mode);
      state.q_num++;

      if (router.currentRoute.name === "friends-quiz") {
        this.commit("GET_FRIEND_LINE", state.q_num);
        return;
      }

      if (router.currentRoute.name === "daily-quiz") {
        state.q_bound = 5;
        let seed = new Date()
          .toLocaleString("en-US", {
            timeZone: "America/New_York",
          })
          .split(", ")[0]
          .split("/")
          .join("");

        seed = seed + state.q_num * 13;
        seed += state.q_num * state.q_num + state.q_num;

        this.commit("GET_DAILY_LINE", seed);
        return;
      }

      if (router.currentRoute.name === "eras-quiz") {
        state.q_bound = 9;
        this.commit("GET_ERAS_LINE", state.q_num);

        return;
      }

      switch (state.mode) {
        case 0:
          // Play with friends
          break;
        case 1: // Freeplay modes
          this.commit("GET_RANDOM_LINE");
          break;
        case 2: // Chorus mode ([ to dstinguish from Pre-Chorus)
          this.commit("GET_LINE_FROM", "[Chorus");
          break;
        case 3: // Verse mode
          this.commit("GET_LINE_FROM", "Verse");
          break;
        case 4: // Bridge mode
          this.commit("GET_LINE_FROM", "Bridge");
          break;
        case 5: // Pre-Chorus mode
          this.commit("GET_LINE_FROM", "Pre-Chorus");
          break;
        case 6: // Intro mode
          this.commit("GET_LINE_FROM", "Intro");
          break;
        case 7: // Outro mode
          this.commit("GET_LINE_FROM", "Outro");
          break;
        case 8: // Evermore
          this.commit("GET_LINE_FROM_ALBUM", 0);
          break;
        case 9: // Folklore
          this.commit("GET_LINE_FROM_ALBUM", 1);
          break;
        case 10: // Lover
          this.commit("GET_LINE_FROM_ALBUM", 2);
          break;
        case 11: // Reputation
          this.commit("GET_LINE_FROM_ALBUM", 3);
          break;
        case 12: // 1989
          this.commit("GET_LINE_FROM_ALBUM", 4);
          break;
        case 13: // Red
          this.commit("GET_LINE_FROM_ALBUM", 5);
          break;
        case 14: // Speak Now
          this.commit("GET_LINE_FROM_ALBUM", 6);
          break;
        case 15: // Fearless
          this.commit("GET_LINE_FROM_ALBUM", 7);
          break;
        case 16: // Debut
          this.commit("GET_LINE_FROM_ALBUM", 8);
          break;
        case 17: // Midnights
          this.commit("GET_LINE_FROM_ALBUM", 9);
          break;
        case 18: // TTPD
          this.commit("GET_LINE_FROM_ALBUM", 10);
          break;
        case 19: // TLOASG
          this.commit("GET_LINE_FROM_ALBUM", 11);
          break;
      }
    },
    RESET_GAME(state) {
      state.similarities = [];
      state.songs = [];
      state.albums = [];
      state.current_line = {};
      state.input = "";
      state.mode = 0;
      state.q_num = 0;
      state.answers = [];
      state.q_bound = 13;
    },
    TRIGGER_ALREADY_PLAYED(state) {
      let result = JSON.parse(localStorage.getItem(`daily_${getDiff()}`));

      state.similarities = [...result.similarities];
      state.songs = [...result.songs];
      state.albums = [...result.albums];
      state.answers = [...result.answers];
    },
  },
  actions: {
    FETCH_DATA(context) {
      fetch(
        "https://raw.githubusercontent.com/MargauxThw/TS-lyrics/main/AllDataOct325.json"
      )
        .then((response) => response.json())
        .then((data) => context.commit("SET_DATA", data));
    },
    UPDATE_DAILY_DATA({ state, getters }) {
      if (localStorage.getItem(`daily_${getDiff()}`) !== null) {
        return;
      }

      let result = {
        num: getDiff(),
        avgSim: getters.getAvgSim,
        num_corr: getters.getNumCorrect,
        similarities: [...state.similarities],
        songs: [...state.songs],
        albums: [...state.albums],
        answers: [...state.answers],
      };

      localStorage.setItem(`daily_${getDiff()}`, JSON.stringify(result));

      state.daily_data = localStorage;
    },
  },
  modules: {},
});
