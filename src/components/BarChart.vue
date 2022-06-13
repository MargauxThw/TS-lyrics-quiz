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
        labels: store.getters.getSongs,
        datasets: [
          {
            data: store.getters.getSimilarities,
            backgroundColor: store.getters.getChartCols.insides,
            borderColor: store.getters.getChartCols.outlines,
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
            borderColor: store.getters.getChartCols.outlines,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            intersect: false,

            callbacks: {
              label: function (context) {
                return ` Album: ${store.getters.getAlbumName(
                  store.getters.getAlbums[context.dataIndex]
                )} | Accuracy: ${context.parsed.x}%`;
              },
              formattedValue: "Hello",
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
#bar-chart {
  width: 90%;
  max-width: 500px;
}
</style>
