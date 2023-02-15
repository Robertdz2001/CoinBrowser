import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./Chart.module.css";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function Chart(props) {
  const [chartData, setChartData] = useState(false);
  const [options, setOptions] = useState(false);
  const [coin, setCoin] = useState(props.coin);

  const getChartInfo = async () => {
    let response;
    let id = coin.id;
    try {
      response = await axios.get(
        "https://api.coinstats.app/public/v1/charts?period=3m&coinId=" + id
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.chart;
  };

  //format time from unix to dd/mm/yyyy and get properties time and value from response
  const getChartData = (response) => {
    let formattedChart = [];

    for (let i = 0; i < response.length; i++) {
      const date = new Date(response[i][0] * 1000);

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      formattedChart.push({
        time: formattedDate,
        value: response[i][1],
      });
    }

    const data = {
      labels: formattedChart.map((item) => item.time),
      datasets: [
        {
          label: "Values",
          data: formattedChart.map((item) => item.value),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(0,0, 0, 0.2)",
          tension: 0.1,
        },
      ],
    };

    return data;
  };

  useEffect(() => {
    async function getChart() {
      const response = await getChartInfo();

      const data = getChartData(response);

      setChartData(data);

      const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
            position: "top",
            align: "left",
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: "rgba(0,0,0,0.2)",
            },
            ticks: {
              color: "#ced4da",
              font: {
                size: 12,
              },
            },
          },
          y: {
            grid: {
              display: true,
              color: "rgba(0,0,0,0.2)",
            },
            ticks: {
              color: "#ced4da",
              font: {
                size: 12,
              },
            },
          },
        },
      };

      setOptions(options);
    }

    getChart();
  }, []);

  if (!options) {
    return <div>Loading</div>;
  }

  return (
    <div className={classes.chart}>
      <header className={classes["chart-title"]}>
        <img src={coin.icon} />
        <span className={classes["coin-name"]}>{coin.name}</span>
      </header>
      <Line className={classes.line} data={chartData} options={options} />
    </div>
  );
}

export default Chart;
