import Vue from "vue";
import Vuex from "vuex";
import seeds from "@/assets/seeded.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    fetched: false,
    quiz_seeds: seeds,
    albumOrder: [
      "evermore",
      "folklore",
      "Lover",
      "Reputation",
      "1989",
      "Red (Taylor's Version)",
      "Speak Now",
      "Fearless (Taylor's Version)",
      "Taylor Swift",
      "Unspecified Album",
    ],
    albumCols: [
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
    albums: [], // 0 => evermore
    mode: 0,
    q_num: 0,
    q_bound: 13,
    quizNames: [
      "Play with friends",
      "Freeplay - 13 lines",
      "Chorus Quiz",
      "Verse Quiz",
      "Bridgeageddon",
      "We love a pre-chorus",
      "Sacred (new) beginnings",
      "Endings we'd never change",
      "evermore",
      "folklore",
      "Lover",
      "Reputation",
      "1989",
      "Red (Taylor's Version)",
      "Speak Now",
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
      console.log(album_name, ind);
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
      return state.quizNames[state.mode];
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
      console.log(state.songs);
      return state.songs;
    },
    getAlbums: (state) => {
      console.log(state.albums);
      return state.albums;
    },
    getChartCols: (state) => {
      const outlines = [
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
  },
  mutations: {
    SET_DATA(state, data) {
      for (var i = 0; i < state.albumOrder.length; i++) {
        Vue.set(state.data, state.albumOrder[i], data[state.albumOrder[i]]);
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

      console.log(full_obj);
      Vue.set(state, "current_line", full_obj);
    },
    GET_LINE_FROM(state, section) {
      console.log("starting");
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
      console.log("ending", state.current_line);
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

      console.log(full_obj);
      Vue.set(state, "current_line", full_obj);
    },
    UPDATE_INPUT(state, input) {
      state.input = input;
    },
    UPDATE_SIMILARITY(state, data) {
      state.similarities.push(data.curr_sim);
      console.log("before", data.song);
      state.songs.push(data.song);
      state.albums.push(data.album);
    },
    PLAY_GAME(state, mode) {
      state.mode = mode;
      state.q_num++;

      console.log(
        "MODE:",
        typeof mode,
        mode,
        state.mode,
        state.fetched,
        state.data
      );

      switch (mode) {
        case 0:
          // Play with friends
          console.log("FRIENDS");
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
          console.log("going");
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
    },
  },
  actions: {
    FETCH_DATA(context) {
      fetch(
        "https://raw.githubusercontent.com/MargauxThw/TS-lyrics/main/AllData.json"
      )
        .then((response) => response.json())
        .then((data) => context.commit("SET_DATA", data))
        .then(() => console.log("FETCH DONE"));
    },
  },
  modules: {},
});
