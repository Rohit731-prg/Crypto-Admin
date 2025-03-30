import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import coin from '../../assets/coin.png'
import { useNavigate } from 'react-router-dom'
import { APIContext } from '../../store/APIContext';

function Login() {
    const navigate = useNavigate();
    const [adminDetails, setAdminDetails] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { userDetails, setUserDetails } = useContext(APIContext);

    const checkAdmin = () => {
       if(adminDetails.name === userDetails.name && adminDetails.password === userDetails.password) {
            alert('Login Successfull');
            navigate('/dashboard');
       } else {
            alert('Invalid Credentials');
       }
    }

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/admin/get');
            console.log();
            if(res) {
                const updatedData = res.data.data[0];
                setUserDetails(updatedData);
            }else {
                alert('Something went wrong', res);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className='w-full h-screen flex flex-row px-40 justify-between bg-black py-40'>
        <div className='w-[40%] flex flex-row items-center gap-5 justify-center'>
            <img src={coin} 
            className='w-24'
            alt="" />
            <p className='text-white text-5xl'>Gold Coin</p>
        </div>
        <div className='w-[2px] bg-white rounded-full'></div>
        <div className='w-[60%] text-white flex flex-col px-20 items-center justify-between py-32'>
            <div>
                <p className='text-center text-5xl mb-5 font-semibold'>Welcome</p>
                <p className='text-center text-gray-400 text-xl'>Please Login to Admin Dashboard</p>
            </div>

            <div className='flex flex-col gap-5 w-full items-center'>
                <input 
                value={adminDetails.name}
                onChange={(e) => setAdminDetails({...adminDetails, name: e.target.value})}
                placeholder='Enter Your Name'
                className='w-2/3 px-5 py-2 rounded-md text-black text-xl'
                type="text" />
                <input 
                value={adminDetails.password}
                onChange={(e) => setAdminDetails({...adminDetails, password: e.target.value})}
                placeholder='Enter Password'
                className='w-2/3 px-5 py-2 rounded-md text-black text-xl'
                type="text" />
            </div>

            <div className='flex flex-col gap-5 w-full items-center'>
                <button
                onClick={checkAdmin}
                className='px-20 py-3 bg-violet-500 rounded-md font-semibold text-xl'
                >LOG IN</button>
                <div className='flex flex-row gap-2 text-[18px]'>
                    <p>Forgotten Your Password ? </p>
                    <button
                    onClick={() => navigate(`/updateAdmin/${userDetails._id}`)}
                    className='text-violet-400'
                    >Forget Password</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login