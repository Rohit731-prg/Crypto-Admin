import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import axios from "axios";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Market() {
  const navigate = useNavigate();
  const percentages = {
    oneHour: 10,
    sevenDays: 20,
    oneMonth: 30,
    all: 40
  };
  const [currentValue, setCurrentValue] = useState(0);
  const [id, setId] = useState('');
  const [inputValue, setInputValue] = useState(0);

  const getData = async () => {
    try {
      const res = await axios.get('/coins/get');
      console.log(res.data);
      
      const updatedPrice = res.data.data[0].price;
      const updatedId = res.data.data[0]._id;

      setId(updatedId);
      setCurrentValue(updatedPrice);
    
    } catch (error) {
      console.log(error);
    }
  }

  const updateValue = async (e) => {
    e.preventDefault();
    const updatedInput = parseFloat(inputValue);
    const values = {
      id,
      updatedPrice: updatedInput
    }
    try {
      const res = await axios.put(`/coins/update`, values);
      console.log(res);
      toast.success('Price Updated Successfully');
      getData();
      setInputValue(0)
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">Market</p>
        <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
            <p className="text-2xl"><IoReorderThree /></p>
            <input 
            placeholder="Search Market"
            className="bg-transparent w-full mx-5 border-none outline-none"
            type="text" />

            <button><FaSearch /></button>
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

      <div className="w-full px-40">
        <div className=" mt-20 w-full bg-black px-20 py-10 rounded-lg">
          <p className="text-xl bg-[#4d5666] inline-block px-10 py-3 rounded-sm">Performance analysis</p>

          <div className="border-b-2 border-white py-10 px-10 flex flex-row justify-between">
            <div className="w-[12%] flex flex-col items-center justify-center gap-3">
              <CircularProgressbar
              value={percentages.oneHour}
              text={`${percentages.oneHour}%`}
              strokeWidth={5}
              styles={buildStyles({
                textColor: "white",
                pathColor: "#7c3aed",
                trailColor: ""
              })}
              />
              <p>1 Hour</p>
            </div>
            <div className="w-[12%] flex flex-col items-center justify-center gap-3">
              <CircularProgressbar
              value={percentages.sevenDays}
              text={`${percentages.sevenDays}%`}
              strokeWidth={5}
              styles={buildStyles({
                textColor: "white",
                pathColor: "#7c3aed ",
                trailColor: ""
              })}
              />
              <p>7 Days</p>
            </div>
            <div className="w-[12%] flex flex-col items-center justify-center gap-3">
              <CircularProgressbar
              value={percentages.oneMonth}
              text={`${percentages.oneMonth}%`}
              strokeWidth={5}
              styles={buildStyles({
                textColor: "white",
                pathColor: "#7c3aed ",
                trailColor: ""
              })}
              />
              <p>1 Month</p>
            </div>
            <div className="w-[12%] flex flex-col items-center justify-center gap-3">
              <CircularProgressbar
              value={percentages.all}
              text={`${percentages.all}%`}
              strokeWidth={5}
              styles={buildStyles({
                textColor: "white",
                pathColor: "#7c3aed ",
                trailColor: ""
              })}
              />
              <p>All</p>
            </div>
          </div>

          <form 
          onSubmit={updateValue}
          className="mt-10 flex flex-col ">
              <p className="text-2xl text-violet-400">Currrent Price : ${currentValue}/CDC</p>
              <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter new price"
              className="w-1/3 py-2 my-5 rounded-full px-5 text-black font-medium"
              type="text" />

              <div className="">
                <button 
                type="submit"
                className="bg-violet-600 px-10 py-2 rounded-full">
                  update coin value
                </button>
              </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Market;
