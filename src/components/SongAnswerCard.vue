<template>
  <div style="border-bottom: 1px solid lightgrey">
    <div
      class="result"
      :class="$store.getters.getAlbumCol(curr_line.question.album_num)"
    >
      <div class="result-container">
        <ul class="results-top">
          <li class="album">
            {{ curr_line.question.album.toUpperCase() }}
          </li>
          <li class="song-section">
            <b>{{ curr_line.question.song }}</b> Line {{ num }}
            {{ curr_line.question.line.section }}
          </li>
        </ul>
        <hr class="results-sep" style="" />
        <p class="prev">{{ curr_line.question.line.prev }}</p>
        <p class="lyrics this-line">{{ curr_line.input }}</p>
        <p class="next">{{ curr_line.question.line.next }}</p>
      </div>
    </div>
    <p>
      Correct Lyrics: <b>{{ curr_line.question.line.this }}</b>
    </p>
    <p>
      Score: <b>{{ curr_line.sim }}% accurate</b>
    </p>
  </div>
</template>

<script>
export default {
  name: "SongAnswerCard",
  props: {
    curr_line: Object,
    num: Number,
  },
};
</script>

<style lang="scss">
@import "../assets/_variables.scss";
.result {
  box-shadow: black 0px 6px 10px;
  color: white;
}

.this-line {
  outline-style: solid;
  outline-width: 1px;
  border-radius: 5px !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
  font-weight: bold;
}

#app {
  .midnights {
    background: $midnights-gradient;
    box-shadow: $midnights-shadow 0px 6px 10px;
    .results-sep {
      background: $midnights-line;
    }
    .this-line {
      outline-color: $midnights-line;
    }
    &.checkButton,
    &.nextButton {
      background: #020f3a;
    }
  }

  .evermore {
    background: $evermore-gradient;
    box-shadow: $evermore-shadow 0px 6px 10px;
    .results-sep {
      background: $evermore-line;
    }
    .this-line {
      outline-color: $evermore-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(188, 0, 0);
    }
  }

  .folklore {
    background: $folklore-gradient;
    box-shadow: $folklore-shadow 0px 6px 10px;
    .results-sep {
      background: $folklore-line;
    }
    .this-line {
      outline-color: $folklore-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(50, 50, 50);
    }
  }

  .lover {
    background: $lover-gradient;
    box-shadow: $lover-shadow 0px 6px 10px;
    .results-sep {
      background: $lover-line;
    }
    .this-line {
      outline-color: $lover-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(92, 139, 196);
    }
  }

  .reputation {
    background: $reputation-gradient;
    box-shadow: $reputation-shadow 0px 6px 10px;
    .results-sep {
      background: $reputation-line;
    }
    .this-line {
      outline-color: $reputation-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(0, 0, 0);
    }
  }

  .nineteen {
    background: $nineteen-gradient;
    box-shadow: $nineteen-shadow 0px 6px 10px;
    .results-sep {
      background: $nineteen-line;
    }
    .this-line {
      outline-color: $nineteen-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(114, 106, 207);
    }
  }

  .red {
    background: $red-gradient;
    box-shadow: $red-shadow 0px 6px 10px;
    .results-sep {
      background: $red-line;
    }
    .this-line {
      outline-color: $red-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(174, 30, 73);
    }
  }

  .speak {
    background: $speak-gradient;
    box-shadow: $speak-shadow 0px 6px 10px;
    .results-sep {
      background: $speak-line;
    }
    .this-line {
      outline-color: $speak-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(115, 18, 112);
    }
  }

  .fearless {
    background: $fearless-gradient;
    box-shadow: $fearless-shadow 0px 6px 10px;
    .results-sep {
      background: $fearless-line;
    }
    .this-line {
      outline-color: $fearless-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(182, 123, 9);
    }
  }

  .debut {
    background: $debut-gradient;
    box-shadow: $debut-shadow 0px 6px 10px;
    .results-sep {
      background: $debut-line;
    }
    .this-line {
      outline-color: $debut-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(27, 96, 105);
    }
  }

  .other {
    background: $other-gradient;
    box-shadow: $other-shadow 0px 6px 10px;
    .results-sep {
      background: $other-line;
    }
    .this-line {
      outline-color: $other-line;
    }
    &.checkButton,
    &.nextButton {
      background: rgb(0, 0, 0);
    }
  }
}

ul {
  display: flex;
  list-style-type: none;
  padding-inline-start: 0%;
}

.in-card {
  margin-block-start: 0;
}

#results {
  flex-direction: column;
}

.album {
  font-family: "Poppins", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 0.75em;
  font-weight: bold;
  padding: 10px 0 5px 0;
}

.song-section {
  font-family: Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 0.875em;
}

.result {
  margin: 0px auto 20px auto;
  max-width: 600px;
  width: 100%;
  color: white;
  border-radius: 10px;
}

.result-container {
  border-radius: 0.5em;
}

.context {
  margin: 0;
  text-align: center;
  padding: 0.5em 1em;
}

.next,
.prev {
  font-family: Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 1em;
  text-align: center;
  padding: 0 1em;
}

.prev {
  margin-block-start: 1em;
  margin-block-end: 0.5em;
}

.next {
  margin-block-start: 0.5em;
  margin-block-end: 1.5em;
  padding-bottom: 20px;
}

.lyrics {
  margin: 0 1em;
  text-align: center;
  border-radius: 0.5em;
  padding: 0 1em;
  font-size: 1.25em;
}

.results-top {
  padding: 0.5em 1em;
  flex-direction: column;
  text-align: center;
}

.results-sep {
  width: 84%;
  border-width: 0;
  height: 1px;
}
</style>
