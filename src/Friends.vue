<template>
  <div id="friends">
    <h2>Play with friends</h2>
    <p>
      Want to find out who knows the lyrics better once and for all? We've
      generated 13 quizzes that will be the same everytime so that you and your
      friends can play the same quiz and compare scores!
    </p>
    <p>
      <b>Disclaimer:</b> These quizzes were originally generated from all lyrics
      in all Taylor Swift songs (as of March 21, 2023 - so before the release of
      Midnights) - if there are any repeats or boring quizzes, apologies 😢
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
export default {
  name: "FriendsMenu",
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
