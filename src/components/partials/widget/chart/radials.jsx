import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useWidth from "@/hooks/useWidth";
import StatisticsService from "@/services/statistics.service.js";

const RadialsChart = () => {
  const [statistic, setStatistic] = useState({total: 0, active: 0, offline: 0,inactive: 0,});
  let total =0;
  const getStatistics = async () => {
    try {
      const response = await StatisticsService.getDeviceStatistic();
      setStatistic(response.data);
      total=response.data.total;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    getStatistics();
  },[])
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();
  const series = [statistic.active, statistic.offline, statistic.inactive];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          value: {
            fontSize: "16px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          total: {
            show: true,
            label: `Total des appareils`,
            color: isDark ? "#CBD5E1" : "#475569",
            formatter: function () {
             return total
            },
          },
        },
        track: {
          background: "#E2E8F0",
          strokeWidth: "97%",
        },
      },
    },
    labels: [ "appareils en ligne", "appareils hors ligne ", "appareils inactifs"],
    colors: [  "#50C793", "#0CE7FA","#FA916B"],
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={width > breakpoints.md ? 360 : 250}
      />
    </div>
  );
};

export default RadialsChart;
