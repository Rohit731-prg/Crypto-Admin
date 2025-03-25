import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import axios from "axios";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Market() {
  const percentage = 66;
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
            <p><IoReorderThree /></p>
            <input 
            placeholder="Search Market"
            className="bg-transparent w-full mx-5 border-none outline-none"
            type="text" />

            <button><FaSearch /></button>
        </div>
        <p className="text-5xl"><IoIosNotifications /></p>
      </nav>

      <div className="w-full px-40">
        <div className=" mt-20 w-full bg-black px-20 py-10 rounded-lg">
          <p className="text-xl bg-[#4d5666] inline-block px-10 py-3 rounded-sm">Performance analysis</p>

          <div className="border-b-2 border-white py-10 px-10 flex flex-row justify-between">
            <div className="w-[12%] flex flex-col items-center justify-center gap-3">
              <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
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
              value={percentage}
              text={`${percentage}%`}
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
              value={percentage}
              text={`${percentage}%`}
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
              value={percentage}
              text={`${percentage}%`}
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
    </div>
  );
}

export default Market;
