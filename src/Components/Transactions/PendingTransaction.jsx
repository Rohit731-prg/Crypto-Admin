import React, { useContext, useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import axios from "axios";
import { APIContext } from "../../store/APIContext";
import Details from "./Details";

function PendingTransaction() {
  const { setTransactionDetails, isShow, setIsShow } = useContext(APIContext);
  
  const [pendingtransaction, setPendingTransaction] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/transactions/get");
      const updated = res.data.data;
      const filterData = updated.filter(
        (transaction) => transaction.status == false
      );
      console.log(filterData);
      setPendingTransaction(filterData);
    } catch (error) {
      console.log("Error from fetchData : ", error);
    }
  };

  const details = (details) => {
    setTransactionDetails(details);
    setIsShow(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e] ${isShow ? 'relative' : ''}`}>
      {isShow == true ? (
        <div className="absolute top-20 left-20 right-20 bottom-20 h-full">
            <Details fetchData={fetchData}/>
        </div>
      ): (
        null
      )}
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
      </nav>

      <div className="mt-40 px-40 w-full pb-20">
        <div className="bg-black p-10">
          <p className="text-xl mb-10 inline-flex flex-row items-center gap-5 px-5 py-3 bg-[#616161] rounded-md">
            <span className="text-red-400 text-4xl">
              <MdErrorOutline />
            </span>
            <span>Pending Transaction</span>
          </p>

          {pendingtransaction == null || pendingtransaction.length == 0 ? (
            <div>
              <p className="text-gray-400 text-[18px]">
                No Pending Transaction Request
              </p>
            </div>
          ) : (
            <div className="w-full">
              <table className="w-full">
                <thead className="w-full">
                  <tr className="w-full flex flex-row justify-between bg-gray-500 py-2 px-5 rounded-t-lg mb-5">
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
                      className="w-full flex flex-row justify-between mb-3 border-b-2 border-gray-500 py-2"
                    >
                      <td className="text-xl w-1/5 text-center">
                        {new Date(Transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-xl w-1/5 text-center">
                        {Transaction.type}
                      </td>
                      <td className="text-xl w-1/5 text-center">
                        {Transaction.buyer}
                      </td>
                      <td
                        className={`text-xl w-1/5 text-center ${
                          Transaction.status ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {Transaction.status ? "Completed" : "Pending"}
                      </td>
                      <td className="text-xl w-1/5 text-center">
                        ₹{Transaction.amount}
                      </td>
                      <td className="text-xl w-1/5 flex justify-center">
                        <button 
                        onClick={() => details(Transaction)}
                        className="p-2 bg-gray-500 rounded-sm cursor-pointer">
                          <CgDetailsMore />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingTransaction;
