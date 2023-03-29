import React, { useState } from "react";
import Chart from "react-apexcharts";
function StockChart({ chartData, symbol }) {
  const { day, week, year } = chartData;
  const [timeWindow, setTimeWindow] = useState("24h");
  const changeTimeFormat = () => {
    switch (timeWindow) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const color = changeTimeFormat()[changeTimeFormat().length - 1].y - changeTimeFormat()[0].y > 0 ? "#26C281" : "#ed3419"
  const options = {
    colors:[color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };
  const series = [
    {
      name: symbol,
      data: changeTimeFormat(),
    },
  ];
  const HandleButtonSelect = (button) => {
    const classes = "btn m-1 sm ";
    if (button === timeWindow) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };
  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      StockChart
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button
          className={HandleButtonSelect("24h")}
          onClick={() => setTimeWindow("24h")}
        >
          24h
        </button>
        <button
          className={HandleButtonSelect("7d")}
          onClick={() => setTimeWindow("7d")}
        >
          7d
        </button>
        <button
          className={HandleButtonSelect("1y")}
          onClick={() => setTimeWindow("1y")}
        >
          1y
        </button>
      </div>
    </div>
  );
}

export default StockChart;
