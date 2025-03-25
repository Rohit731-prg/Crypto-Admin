import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import axios from "axios";

function Transactions() {
  const [Transactions, setTransactions] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/transactions/get');
      const updatedTransactions = res.data.data;
      console.log(updatedTransactions);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.log("error from transactions", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">Transactions</p>
        <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
          <p>
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

      {Transactions == null ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <div>
          <h1>Transactions</h1>

          {Transactions.map((Transaction, insex) => (
            <div key={insex}>
              <p>{Transaction.buyer}</p>
            </div>
          ))}
        </div>
      )}

      </div>
  );
}

export default Transactions;
