<template>
  <div v-if="show">
    <apexchart type="area" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>
<script>
import dashboardService from 'src/services/dashboardService';
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'DashBoard',
  components: {
    apexchart: VueApexCharts
  },

  setup () {
    const show = ref(false);

    const chartOptions = ref({
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May']
        }
      });
    const chartSeries = ref([
      {
        name: 'Quantidade',
        data: [10,20,30,40,50]
      }
    ]);

   onMounted(() => {
    dashboardService('/dashboard/exames').list().then((data)=>{

      chartOptions.value = {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories:  data.map(x => x[0])
        }
      }

      chartSeries.value = [{
        name: 'Quantidade',
        data: data.map(x => x[1])
      }]

      show.value = true;
    });
   })

    return {
      show,
      chartOptions,
      chartSeries
    }
  }
}
</script>
