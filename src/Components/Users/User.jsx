import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";

function User() {
    const [users, setUsers] = useState(null);
    const [details, setDetails] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/users/get');
            const data = res.data.data;
            setUsers(data);
        } catch (error) {
            console.log()
        }
    }

    const seeDetails = (details) => {
        setDetails(details);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

  return (
    <div className='w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]'>
        <nav className="mt-5 flex flex-row justify-between items-center px-20">
            <p className="text-4xl">Users</p>
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

        <div className='px-20'>
            <div className='flex flex-row gap-10 my-20'>
                <div className='bg-black w-1/3 rounded-lg p-10'>
                    <p className='text-xl mb-5'>Users</p>
                    {users && users.map((user, index) => (
                        <div key={index}>
                            {user.authorized && (
                                <button
                                onClick={() => seeDetails(user)}
                                className='my-2 cursor-pointer w-full'
                                >
                                   <div className='w-full flex flex-col items-start'>
                                        <p className='text-xl'>{user.name}</p>
                                        <p className='text-[17px] text-gray-400'>Coin Hold : {user.coin}</p>
                                   </div>
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className='bg-black w-2/3 rounded-lg p-10'>
                    <p className='text-xl'>User Details</p>
                    {details == null ? (
                        <div className='w-full h-full flex justify-center items-center'>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <div className='mt-8'>
                            <p className='text-3xl'>{details.name}</p>
                            <p className='text-xl text-gray-400 mt-2'>Country : <span className='text-white text-2xl'>{details.country}</span></p>
                            <p className='text-xl mt-5 text-gray-400'>Total Coin : <span className='text-white text-2xl'>{details.coin}</span></p>

                            <div className='mt-10'>
                                <p className='text-xl'>Basic Details</p>
                                <div className='mt-5'>

                                    <div className='w-full flex flex-row justify-between'>
                                        <p className='text-gray-400'>Email : <span className='text-white text-xl'>{details.email}</span></p>
                                        <p className='text-gray-400'>Phone No : <span className='text-white text-xl'>{details.phone}</span></p>
                                    </div>

                                    <div className='w-full flex flex-row justify-between mt-5'>
                                        <p className='text-gray-400'>Date of birth : <span className='text-white text-xl'>{details.dateOfBirth}</span></p>
                                        <p className='text-gray-400'>Created At : <span className='text-white text-xl'>{new Date(details.createdAt).toLocaleDateString()}</span></p>

                                    </div>

                                    <p className='text-gray-400 mt-5'>Last Update : <span className='text-white text-xl'>{new Date(details.updatedAt).toLocaleDateString()}</span></p>

                                    <p className='text-gray-400 mt-10'>Address : <span className='text-white text-xl'>{details.address}</span></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default User