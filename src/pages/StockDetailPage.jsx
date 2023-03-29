import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import Header from "../components/Header";
import StockChart from "../components/StockChart";
import StockData from "../components/StockData";

function StockDetailPage() {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();

  const formatData = (data) => {
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: Math.floor(data.c[index]),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let day = currentTime - 24 * 60 * 60;
      if (date.getDay() === 6) {
        day = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        day = currentTime - 3 * 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: day,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, [symbol]);

  return (

    <div className="container-fluid mb-5">
      <Header/>
      <div className="row">
        <div className="col"></div>
        <div className="col-md-8 col-sm-12">
          {chartData && <StockChart symbol={symbol} chartData={chartData} />}
        </div>
        <div className="col"></div>
      </div>
      <StockData symbol={symbol} />
    </div>
  );
}

export default StockDetailPage;
