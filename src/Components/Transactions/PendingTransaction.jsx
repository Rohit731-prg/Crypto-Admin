import React, { useContext, useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import axios from "axios";
import { APIContext } from "../../store/APIContext";
import Details from "./Details";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import loading from "../../assets/loading.json";
import Lottie from "lottie-react";

function PendingTransaction() {
  const navigate = useNavigate();
  const { setTransactionDetails, isShow, setIsShow } = useContext(APIContext);

  const [pendingtransaction, setPendingTransaction] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://really-classic-moray.ngrok-free.app/transactions/get",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (res.data.status == false) {
        setPendingTransaction(0);
      }

      const updatedTransactions = res.data.data.filter(
        (transaction) => transaction.status != true
      );
      setPendingTransaction(updatedTransactions);

    } catch (error) {
      console.log("Error from fetchData: ", error);
    }
  };

  const details = (details) => {
    setTransactionDetails(details);
    setIsShow(true);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className={`w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e] ${
        isShow ? "relative" : ""
      }`}
    >
      {isShow == true ? (
        <div className="absolute top-40 left-60 right-60 bottom-40 h-full">
          <Details fetchData={fetchData} toast={toast} />
        </div>
      ) : null}

      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">Pending Transaction</p>
        <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
          <p className="text-2xl">
            <IoReorderThree />
          </p>
          <input
            placeholder="Search Pending Transaction"
            className="bg-transparent w-full mx-5 border-none outline-none"
            type="text"
          />
          <button name="search">
            <FaSearch />
          </button>
        </div>
        <p className="text-5xl flex flex-row items-start gap-0">
          <IoIosNotifications />
          <span className="text-[18px] bg-red-500 p-2 rounded-full">
            {pendingtransaction != null ? pendingtransaction.length : null}
          </span>
        </p>
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

      {pendingtransaction == null ? (
        <div className="w-full h-full flex justify-center items-center">
          <div>
            <Lottie animationData={loading} loop={true} className="w-20" />
          </div>
          <p className="text-3xl font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="mt-40 px-40 w-full pb-20">
          <div className="w-full h-full bg-black p-10 rounded-sm">
            <p className="text-xl mb-10 inline-flex flex-row items-center gap-5 px-5 py-3 bg-[#616161] rounded-md">
              <span className="text-red-400 text-4xl">
                <MdErrorOutline />
              </span>
              <span>Pending Transaction</span>
            </p>

            {pendingtransaction == 0 ? (
              <div>
                <p className="">No Pending Transaction</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="w-full">
                  <tr className="w-full flex flex-row justify-between bg-gray-500 py-2 px-5 rounded-t-lg mb-5">
                    <td className="text-[20px] font-semibold w-1/5 text-center">
                      Photo
                    </td>
                    <td className="text-[20px] font-semibold w-1/5 text-center">
                      Date
                    </td>
                    <td className="text-[20px] font-semibold w-1/5 text-center">
                      Type
                    </td>
                    <td className="text-[20px] font-semibold w-1/5 text-center">
                      Name
                    </td>
                    <td className="text-[20px] font-semibold w-1/5 text-center">
                      Value
                    </td>
                    <td className="text-[20px] font-semibold w-1/5 text-center">
                      Amount
                    </td>
                    <td className="text-[20px] font-semibold w-1/5 text-center">
                      Details
                    </td>
                  </tr>
                </thead>

                <tbody className="w-full px-10">
                  {pendingtransaction.map((Transaction, index) => (
                    <tr
                      key={index}
                      className="w-full flex flex-row justify-between px-5 rounded-t-lg mb-5 items-center"
                    >
                      <td className="text-xl w-1/5 flex justify-center">
                        <img
                          className="w-20 h-20 rounded-full object-cover"
                          src={Transaction.buyer.photo}
                          alt="image"
                        />
                      </td>
                      <td className="text-xl w-1/5 text-center">
                        {new Date(Transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-xl w-1/5 text-center">
                        {Transaction.type}
                      </td>
                      <td className="text-xl w-1/5 text-center">
                        {Transaction.buyer.fullName}
                      </td>
                      <td
                        className={`text-xl w-1/5 text-center ${
                          Transaction.status ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {Transaction.status ? "Completed" : "Pending"}
                      </td>
                      <td className="text-xl w-1/5 text-center">
                        ₹{Math.round(Transaction.amount)}
                      </td>
                      <td className="text-xl w-1/5 flex justify-center">
                        <button
                          onClick={() => details(Transaction)}
                          className="p-2 bg-gray-500 rounded-sm cursor-pointer"
                        >
                          <CgDetailsMore />
                        </button>
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

export default PendingTransaction;
