import React, {useState} from 'react'
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";

function Dashboard() {
  const [Transactions, setTransactions] = useState(null);
  return (
    <div className='w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]'>
        <nav className="mt-5 flex flex-row justify-between items-center px-20">
            <p className="text-4xl">Dashboard</p>
            <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
                <p><IoReorderThree /></p>
                <input 
                placeholder="Search Dashboard"
                className="bg-transparent w-full mx-5 border-none outline-none"
                type="text" />

                <button name='search'><FaSearch /></button>
            </div>
            <p className="text-5xl"><IoIosNotifications /></p>
          </nav>

          <div className="mt-20 px-40 w-full pb-20">
            <div className="mt-40 w-full bg-black px-20 py-10 rounded-lg">
              <p className='text-xl'>Market Overview</p>

              
            </div>

            <div className="mt-20 w-full bg-black px-20 py-10 rounded-lg text-white">
              <div className="flex flex-row justify-between mb-10">
                <p className="text-xl">Transaction</p>
                <p className="text-sm text-gray-400 font-medium">See All</p>
              </div>

              {Transactions == null ? (
                <div className='flex flex-row items-center justify-between'>
                  <div className='flex flex-row items-center gap-3'>
                    <img src="" 
                    className="w-10 h-10 object-cover rounded-full" />
                    <p>CDC</p>
                  </div>

                  <div className='flex flex-col items-end'>
                    <p>10:34 AM</p>
                    <p className='text-gray-400'>2 Nov 2025</p>
                  </div>

                  <div className='flex flex-col items-end'>
                    <p>+0.258 CDC</p>
                    <p className='text-gray-400'>$ 3154</p>
                  </div>

                  <p>Complicated</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
    </div>
  )
}

export default Dashboard