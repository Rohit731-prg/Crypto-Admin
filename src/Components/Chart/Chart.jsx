import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ toast }) {
  const [chartType, setChartType] = useState("day");
  const [priceList, setPriceList] = useState([]);
  const [originalPriceList, setOriginalPriceList] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("coins/get");
      const data = res.data.data[0].list;

      const parsed = data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));

      // Save original and current display data
      setOriginalPriceList(parsed);
      setPriceList(parsed);
    } catch (error) {
      toast.error("Failed to fetch price data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const changeChartType = (type) => {
    if (!originalPriceList || originalPriceList.length === 0) {
      toast.error("No data available");
      return;
    }

    const today = new Date();
    let filteredData = [];

    switch (type) {
      case "day":
        filteredData = originalPriceList.filter((item) => {
          const itemDate = item.date;
          return (
            itemDate.toDateString() === today.toDateString() ||
            itemDate.toDateString() ===
              new Date(today - 86400000).toDateString()
          );
        });
        break;

      case "month":
        const thirtyDaysAgo = new Date(
          today.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        filteredData = originalPriceList.filter(
          (item) => item.date >= thirtyDaysAgo
        );
        break;

      case "all":
        filteredData = originalPriceList;
        break;

      default:
        filteredData = originalPriceList;
    }

    setPriceList(filteredData);
    setChartType(type);
  };

  const data = {
    labels: priceList.map((item) => {
      if (chartType === "day") {
        return item.date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      } else if (chartType === "month") {
        return item.date.toLocaleDateString([], {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });
      } else {
        return item.date.toLocaleDateString([], {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }
    }),

    datasets: [
      {
        label: "Price",
        data: priceList.map((item) => item.price),
        borderColor: "#a855f7", // vibrant purple
        backgroundColor: "rgba(168, 85, 247, 0.1)", // soft purple fill
        pointBackgroundColor: "#a855f7",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointRadius: 3,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#fff",
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#fff",
          font: { size: 12 },
          callback: (value) => `$${(value / 1000).toFixed(2)}K`, // e.g. $34.55K
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `$${context.parsed.y.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },
  };

  return (
    <div>
      <div className="w-full flex flex-row justify-center items-center mb-10">
        <div className="flex bg-[#424242] px-2 py-3 rounded-xl text-xl font-semibold">
          <button
            onClick={() => changeChartType("day")}
            className={`${
              chartType === "day" ? "bg-black" : ""
            } px-4 py-1 rounded-md`}
          >
            Week
          </button>
          <button
            onClick={() => changeChartType("month")}
            className={`${
              chartType === "month" ? "bg-black" : ""
            } px-4 py-1 rounded-md`}
          >
            Month
          </button>
          <button
            onClick={() => changeChartType("all")}
            className={`${
              chartType === "all" ? "bg-black" : ""
            } px-4 py-1 rounded-md`}
          >
            All
          </button>
        </div>
      </div>
      <div className="w-full rounded-xl shadow-lg p-10 mt-5">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Chart;
