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

export default {
  name: "DailyChart",
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
      default: "daily-chart",
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
  data() {
    return {
      chartData: {
        labels: [
          "0-10%",
          "10-20%",
          "20-30%",
          "30-40%",
          "40-50%",
          "50-60%",
          "60-70%",
          "70-80%",
          "80-90%",
          "90-100%",
        ],
        datasets: [
          {
            data: store.getters.getDailyData,
            backgroundColor: "rgba(44, 62, 80, 0.5)",
            borderColor: "rgb(44, 62, 80)",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            intersect: false,

            callbacks: {
              // label: null,
              // label: function (context) {
              //   return ` Album: ${store.getters.getAlbumName(
              //     store.getters.getAlbums[context.dataIndex]
              //   )} | Accuracy: ${context.parsed.x}%`;
              // },
            },
          },
        },
        scales: {
          x: {
            min: 0,
            max: Math.max(...store.getters.getDailyData),
            ticks: {
              callback: function (value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
            },
          },
          y: {
            ticks: {
              // display: window.innerWidth > 600 ? true : false,
            },
          },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
#bar-chart {
  width: 90%;
  max-width: 500px;
}
</style>
