import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import axios from "axios";
import loading from "../../assets/loading.json";
import Lottie from "lottie-react";

function Transactions() {
  const [Transactions, setTransactions] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/transactions/get");
      const updatedTransactions = res.data.data;
      console.log(updatedTransactions);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.log("error from transactions", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">Transactions</p>
        <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
          <p className="text-2xl">
            <IoReorderThree />
          </p>
          <input
            placeholder="Search Transactions"
            className="bg-transparent w-full mx-5 border-none outline-none"
            type="text"
          />

          <button>
            <FaSearch />
          </button>
        </div>
        <p className="text-5xl">
          <IoIosNotifications />
        </p>
      </nav>

      {Transactions == null || Transactions.length == 0 ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex flex-row justify-center items-center">
            <div className="w-40">
              <Lottie animationData={loading} loop={true} />
            </div>
            <h1 className="text-3xl">Loading...</h1>
          </div>
        </div>
      ) : (
        <div className="mt-40 px-40">
          <div className="mt-20 w-full bg-black px-20 py-10 rounded-lg">
            <p className="text-[20px] mb-10 bg-gray-500 py-2 px-8 inline-block rounded-sm">All Transactions</p>
            <table className="w-full">
              <thead className="w-full">
                <tr className="w-full flex flex-row justify-between bg-gray-500 py-2 px-5 rounded-t-lg mb-5">
                  <td className="text-[20px] font-semibold w-1/5 text-center">Date</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Type</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Name</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Value</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Amount</td>
                </tr>
              </thead>

              <tbody className="w-full">
                {Transactions.map((Transaction, index) => (
                  <tr
                    key={index}
                    className="w-full flex flex-row justify-between mb-3"
                  >
                    <td className="text-xl w-1/5 text-center">{new Date(Transaction.createdAt).toLocaleDateString()}</td>
                    <td className="text-xl w-1/5 text-center">{Transaction.type}</td>
                    <td className="text-xl w-1/5 text-center">{Transaction.buyer}</td>
                    <td className={`text-xl w-1/5 text-center ${Transaction.status ? 'text-green-500' : 'text-red-500'}`}>{Transaction.status ? "Completed" : "Pending"}</td>
                    <td className="text-xl w-1/5 text-center">{Transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
