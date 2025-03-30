import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { APIContext } from '../../store/APIContext';

function Details({fetchData}) {
    const { transactionDetails, isShow, setIsShow } = useContext(APIContext);
    const [userDetails, setUserDetails] = useState(null);

    const fetchUser = async () => {
        const id = transactionDetails.buyer;
        console.log(id);
        try {
            const res = await axios.post('/users/getUserByID', {id});
            const data1 = res.data.data;
            
            setUserDetails(data1);
        } catch (error) {
            console.log("Erroe from fetchUser : ", error);
        }
    };

    const updatePayment = async () => {
        const id = transactionDetails._id;
        try {
            const res = await axios.put('http://localhost:4000/transactions/updateStatus', {id});
            console.log(res.data.ststus);
            if (res.data.status == true) {
                fetchData();
                alert('Payment Successfull');
            } else {
                alert('Payment Failed');
            }
        } catch (error) {
            console.log("Error from updatePayment : ", error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
  return (
    <div className='w-full h-full'>
        <div className='w-full flex justify-end'>
            <button 
            onClick={() => setIsShow(false)}
            className='text-2xl mb-5 p-3 bg-gray-500 rounded-full'>
                <RxCross2 />
            </button>
        </div>

        <div className='flex flex-row gap-5 p-10 bg-gray-700'>
            <img 
            className='w-1/3 h-full object-cover'
            src="data:image/png;base64,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" alt="" />

            <div className='w-2/3'>
                <p>Full Name</p>
                <p>{userDetails == null ? 'Loading...' : userDetails.name}</p>

                <p>Current Holding Coind</p>
                <p>{userDetails == null ? 'Loading...' : userDetails.coin}</p>

                <div className='w-full'>
                    <div className='w-1/3'>
                        <p>Type</p>
                        <p>{transactionDetails.type}</p>
                    </div>
                    <div className='w-1/3'>
                        <p>Coin</p>
                        <p>{transactionDetails.coin}</p>
                    </div>
                    <div className='w-1/3'>
                        <p>Amount</p>
                        <p>{transactionDetails.amount}</p>
                    </div>
                    <div className='w-1/3'>
                        <p>Amount</p>
                        <p>{transactionDetails.amount}</p>
                    </div>
                    <div className='w-1/3'>
                        <p>Amount</p>
                        <p>{transactionDetails.amount}</p>
                    </div>
                    <div className='w-1/3'>
                        <p>Date</p>
                        <p>{new Date(transactionDetails.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div>
                    <button
                    className=''
                    onClick={() => updatePayment(transactionDetails._id)}
                    >
                        <IoCheckmarkDoneCircleSharp /> Approve
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Details