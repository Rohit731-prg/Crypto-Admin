import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { APIContext } from "../../store/APIContext";
import card from "../../assets/card.png";
import toast, { Toaster } from 'react-hot-toast';

function Details({ fetchData, toast }) {
  const { transactionDetails, isShow, setIsShow } = useContext(APIContext);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUser = async () => {
    const id = transactionDetails.buyer;
    console.log(id);
    try {
      const res = await axios.post("/users/getUserByID", { id });
      const data1 = res.data.data;

      setUserDetails(data1);
    } catch (error) {
      console.log("Erroe from fetchUser : ", error);
    }
  };

  const updatePayment = async () => {
    const id = transactionDetails._id;
    try {
      const res = await axios.put(
        "http://localhost:4000/transactions/updateStatus",
        { id }
      );
      console.log(res.data.ststus);
      if (res.data.status == true) {
        console.log(transactionDetails.buyer._id, transactionDetails.type, transactionDetails.coin);
        const updateCoin = await axios.put('http://localhost:4000/users/updateCoin', {
          id: transactionDetails.buyer._id,
          type: transactionDetails.type,
          coin: transactionDetails.coin
        })
        if(updateCoin) {
          fetchData();
          toast.success("Payment Successfull");
          setIsShow(false);
        } else {
          toast.error("Payment Failed");
        }
      } else {
        toast.error("Payment Failed");
      }
    } catch (error) {
      console.log("Error from updatePayment : ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setIsShow(false)}
          className="text-2xl mb-5 p-3 bg-gray-500 rounded-full"
        >
          <RxCross2 />
        </button>
      </div>

      <div className="flex flex-row gap-5 p-10 bg-gray-700">
        <img
          className="w-1/3 h-full object-cover"
          src={transactionDetails.image}
          alt=""
        />

        <div className="w-2/3">
          <p className="text-xl px-5 py-3 bg-black inline-block rounded-md mb-10">
            Transaction Details
          </p>

          <div className="w-full flex flex-row justify-between px-5 border-b-[1px] border-gray-500 pb-5">
            <div className="flex flex-row items-center gap-5">
              <img src={card} className="w-20 h-16" />
              <div>
                <p className="text-xl text-gray-400">Account</p>
                <p className="text-[24px] text-white font-semibold">
                  {transactionDetails.type}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xl text-gray-400">
                {new Date(transactionDetails.createdAt).toLocaleString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  }
                )}
              </p>
            </div>
          </div>
          <p className="text-gray-400 mt-5 text-xl">Full Name</p>
          <p className="text-white text-[24px]">{transactionDetails.buyer.name}</p>

          <div className="w-full">
            
            <div className="w-1/3 py-5 flex flex-row gap-20">
              <div>
                <p className="text-xl text-gray-400">Coin</p>
                <p className="text-[24px] text-white font-semibold">{transactionDetails.coin}</p>
              </div>

              <div>
                <p className="text-xl text-gray-400">Amount</p>
                <p className="text-[24px] text-white font-semibold"><span className={`${transactionDetails.type == 'buy' ? 'text-green-500' : 'text-red-500'}`}>{transactionDetails.type == 'buy' ? '+' : '-'}</span>$ {transactionDetails.amount}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-xl">Current Holding Coins : <span className="text-white text-[24px]">{transactionDetails.buyer.coin}</span></p>

          <div className="mt-8">
            <button
              className="text-xl px-20 py-2 bg-violet-600 flex flex-row items-center gap-3 text-white font-semibold rounded-md"
              onClick={() => updatePayment(transactionDetails._id)}
            >
              <IoCheckmarkDoneCircleSharp /> Approve
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Details;
