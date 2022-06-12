<template>
  <div id="chart-container">
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import store from "@/store";
import { mapGetters } from "vuex";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

export default {
  name: "BarChart",
  components: { Bar },
  computed: {
    ...mapGetters({
      sims: "getSimilarities",
      songs: "getSongs",
      data: "getData",
    }),
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      //   default: 300,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(
      this.sims,
      this.songs,
      store,
      window.innerHeight,
      window.innerWidth
    );
  },
  data() {
    return {
      chartData: {
        labels: store.getters.getSongs,
        datasets: [
          {
            data: store.getters.getSimilarities,
            backgroundColor: [
              CHART_COLORS.red,
              CHART_COLORS.red,
              CHART_COLORS.orange,
              CHART_COLORS.yellow,
              CHART_COLORS.green,
              CHART_COLORS.blue,
              CHART_COLORS.purple,
              CHART_COLORS.grey,
              "green",
              "red",
              "red",
              "green",
              "green",
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.parsed.x + "%";
              },
            },
          },
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
          },
          y: {
            ticks: {
              display: window.innerWidth > 600 ? true : false,
            },
          },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
// canvas#bar-chart {
//   width: 20px !important;
//   div {
//     max-height: 20px !important;
//   }
// }
#bar-chart {
  //   width: 20px !important;
  //   width: 1000px !important;
  //   height: 600px !important;
  width: 90%;
  max-width: 500px;
}
</style>
