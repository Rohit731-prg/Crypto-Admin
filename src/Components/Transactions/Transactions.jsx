import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import axios from "axios";
import loading from "../../assets/loading.json";
import Lottie from "lottie-react";
import { GoClockFill } from "react-icons/go";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Transactions() {
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
      if (res.data.status == false) {
        console.log('res.data.data');
        setTransactions(0);
        return;
      }
      const updatedTransactions = res.data.data;
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
        <button
            onClick={() => navigate('/')}
            className="group flex items-center justify-start w-11 h-11 bg-violet-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32  active:translate-x-1 active:translate-y-1">
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

      {Transactions == null ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex flex-row justify-center items-center gap-5">
            <div className="w-20">
              <Lottie animationData={loading} loop={true} />
            </div>
            <h1 className="text-3xl font-semibold">Loading...</h1>
          </div>
        </div>
      ) : (
        <div className="mt-40 px-40">
          <div className="mt-20 w-full bg-black px-20 py-10 rounded-lg">
            <p className="text-2xl mb-10 bg-[#616161] py-3 px-5 inline-block rounded-sm">All Transactions</p>

            {Transactions == 0 ? (
              <div>
                <p>No Transactions Found</p>
              </div>
            ) : (
              <table className="w-full">
              <thead className="w-full">
                <tr className="w-full flex flex-row justify-between bg-gray-500 py-2 px-5 rounded-lg mb-5">
                  <td className="text-[20px] font-semibold w-1/5 text-center">Photo</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Date</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Type</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Name</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Amount</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Coin</td>
                  <td className="text-[20px] font-semibold w-1/5 text-center">Status</td>
                </tr>
              </thead>

              <tbody className="w-full">
                {Transactions.map((Transaction, index) => (
                  <tr
                    key={index}
                    className="w-full flex flex-row justify-between mb-3 items-center"
                  >
                    <td className="text-xl w-1/5 flex items-center justify-center">
                      <img 
                      className="w-10 h-10 rounded-full object-cover"
                      src={Transaction.buyer.photo} alt="image" />
                    </td>
                    <td className="text-xl w-1/5 text-center">{new Date(Transaction.createdAt).toLocaleDateString()}</td>
                    <td className="text-xl w-1/5 text-center">{Transaction.type}</td>
                    <td className="text-xl w-1/5 text-center">{Transaction.buyer.fullName}</td>
                    
                    <td className="text-xl w-1/5 text-center text-green-500">{`+${Transaction.amount}`}</td>
                    <td className="text-xl w-1/5 text-center">{Transaction.coin}</td>
                    <td 
                    className={`text-xl w-1/5 px-3 py-2 rounded-md font-semibold ${Transaction.status ? 'text-green-700 bg-green-100' : 'text-red-800 bg-red-100'}`}>
                      {Transaction.status ? <p 
                      className="flex flex-row items-center gap-2">
                        <IoCheckmarkDoneCircleSharp />Completed</p> : <p
                        className="flex flex-row items-center gap-2"
                        ><GoClockFill />Pending
                      </p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
