import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import Loading from "../../assets/loading.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BsQrCodeScan } from "react-icons/bs";
import { QRCodeSVG } from "qrcode.react";

function QRcode() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const [BTCqr, setBTCqr] = useState(null);
  const [USDTqr, setUSDTqr] = useState(null);
  const [id, setID] = useState(null);

  const updateQrCode = async (type) => {
    try {
      console.log(id);
      if (!id) {
        return toast.error("Please wait for a moment");
      }

      if (type == "BTC") {
        const res = await axios.put(
          "https://really-classic-moray.ngrok-free.app/qrCode/update",
          {
            id: id,
            code: BTCqr,
            type: type,
          }
        );

        console.log(res);
        alert("Updated Successfully");
      } else {
        const res = await axios.put(
          "https://really-classic-moray.ngrok-free.app/qrCode/update",
          {
            id: id,
            code: USDTqr,
            type: type,
          }
        );

        console.log(res);
        toast.success("Updated Successfully");
        fetchDATA();
      }
    } catch (error) {
      console.log("Error from updateQrCode : ", error);
      toast.error(error.response?.data?.message);
    }
  };

  const fetchDATA = async () => {
    try {
      const res = await axios.get(
        "https://really-classic-moray.ngrok-free.app/qrCode/get",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log(res.data);
      setData(res.data.data[0]);
      setID(res.data.data[0]._id);

      setBTCqr(res.data.data[0].BTCqr);
      setUSDTqr(res.data.data[0].USDTqr);
    } catch (error) {
      console.log("Error from fetchDATA : ", error);
    }
  };

  useEffect(() => {
    fetchDATA();
  }, []);
  return (
    <div className="w-full text-white h-auto bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">QR PAGE</p>
        <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
          <p className="text-2xl">
            <IoReorderThree />
          </p>
          <input
            placeholder="Search QR CODE"
            className="bg-transparent w-full mx-5 border-none outline-none"
            type="text"
          />

          <button>
            <FaSearch />
          </button>
        </div>
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

      <div className="px-40">
        {data == null ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div>
              <Lottie animationData={Loading} loop={true} className="w-20" />
            </div>
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        ) : (
          <div className="mt-40 bg-black flex flex-col p-10 gap-10">
            <div className="flex w-fit rounded-sm flex-row gap-3 items-center text-xl font-semibold px-10 py-3 bg-gray-600">
              <BsQrCodeScan />
              <p>Change QR Code</p>
            </div>

            <div className="flex flex-row gap-10">
              <div className="bg-[#525252] flex flex-col w-1/2 p-10 rounded-xl">
                <p className="text-3xl font-semibold">BTC QR CODE</p>
                <div className="border-2 w-fit my-5">
                  <QRCodeSVG value={BTCqr} height={300} width={300} />
                </div>
                <div className="flex flex-col">
                  <input
                    value={BTCqr}
                    placeholder="Enter BTC QR Code"
                    className="bg-white w-full text-black border-none outline-none px-5 py-2 rounded-xl"
                    onChange={(e) => setBTCqr(e.target.value)}
                    type="text"
                  />

                  <p className="my-2 font-semibold text-xl">
                    Current ID : <br />
                    {data.BTC}
                  </p>
                  <div className="mt-5 px-5">
                    <button
                      className="flex flex-row gap-3 px-5 py-2 items-center font-semibold text-xl bg-violet-700 text-white rounded-full "
                      onClick={() => updateQrCode("BTC")}
                    >
                      <GrUpdate />
                      <span>Update BTC QR</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#525252] flex flex-col p-10 rounded-xl w-1/2">
                <p className="text-3xl font-semibold">USDT QR CODE</p>
                <div className="border-2 w-fit my-5">
                  <QRCodeSVG value={USDTqr} height={300} width={300} />
                </div>
                <div className="flex flex-col">
                  <input
                    placeholder="Enter USDT QR Code"
                    value={USDTqr}
                    className="bg-white text-black w-full border-none outline-none px-5 py-2 rounded-xl"
                    onChange={(e) => setUSDTqr(e.target.value)}
                    type="text"
                  />
                  <p className="my-2 font-semibold text-xl">
                    Current ID : <br />
                    {data.USDT}
                  </p>
                  <div className="mt-5 px-5">
                    <button
                      className="flex flex-row gap-3 px-5 py-2 items-center font-semibold text-xl bg-violet-700 text-white rounded-full "
                      onClick={() => updateQrCode("USDT")}
                    >
                      <GrUpdate />
                      <span>Update BTC QR</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default QRcode;
