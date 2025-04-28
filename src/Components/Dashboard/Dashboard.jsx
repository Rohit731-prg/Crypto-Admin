import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import buy from "../../assets/buy.png";
import sell from "../../assets/sell.png";
import Chart from '../Chart/Chart'
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
  const navigate = useNavigate();
  const [Transactions, setTransactions] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://really-classic-moray.ngrok-free.app/transactions/get", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        }
      });
      console.log(res.data);
      const updatedTransactions = res.data.data.slice(0, 4);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.log("Error from fetchData : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full text-white h-auto bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">Dashboard</p>
        
        <button
          onClick={() => navigate("/")}
          className="group flex items-center justify-start w-11 h-11 bg-violet-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32  active:translate-x-1 active:translate-y-1"
        >
          <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            Logout
          </div>
        </button>
      </nav>

      <div className="mt-20 px-40 w-full pb-20">
        <div className="mt-40 w-full bg-black px-20 py-10 rounded-lg">
          <p className="text-xl bg-gray-700 px-5 py-3 rounded-sm inline-block">Market Overview</p>

          <Chart toast={toast} />
        </div>

        <div className="mt-20 w-full bg-black px-20 py-10 rounded-lg text-white">
          <div className="flex flex-row justify-between mb-10">
            <p className="text-xl bg-gray-700 px-5 py-3 rounded-sm">Transaction</p>
            <button
              onClick={() => navigate("/transactions")}
              className="text-sm text-white px-5 py-2 rounded-sm font-medium bg-violet-600"
            >
              See All
            </button>
          </div>

          {Transactions == null ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3">
              {Transactions.map((transaction) => (
                <div key={transaction._id} className="w-full flex flex-row justify-between px-5 items-center">
                  <div className="flex flex-row items-center gap-3 w-1/5">
                    <img
                      src={transaction.type == "buy" ? buy : sell}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-xl w-1/5">Gold Coin</p>
                  </div>
                  <p>{transaction.buyer.fullName}</p>
                  <div className="flex flex-col items-end w-1/5">
                    <p className="text-xl text-white">
                      {new Date(transaction.createdAt).toLocaleTimeString(
                        "en-US",
                        { hour: "2-digit", minute: "2-digit", hour12: true }
                      )}
                    </p>
                    <p className="text-[16px] text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </p>
                  </div>

                  <p className="text-xl w-1/5 text-end">
                    <span 
                    className={`text-green-500 text-xl`}>
                      +
                    </span>
                    <span className="text-xl ml-2">{transaction.amount} gold Coin</span>
                  </p>

                  <p className={`${transaction.status ? 'text-green-500' : 'text-red-500'} text-xl w-1/5 text-end`}>
                    {transaction.status ? 'Completed' : 'Pending'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Dashboard;
