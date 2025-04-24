import React, { useContext, useState } from 'react';
import axios from 'axios';
import coin from '../../assets/coin.png';
import { useNavigate } from 'react-router-dom';
import { APIContext } from '../../store/APIContext';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const { setIsAdminCreate } = useContext(APIContext);

    const {
        isAdminCreate,
        setAdminID,
        userDetails,
        setUserDetails
    } = useContext(APIContext);

    const [adminDetails, setAdminDetails] = useState({
        email: '',
        password: ''
    });

    // const checkAdmin = async () => {
        
    //     try {
    //         const res = await axios.post('https://really-classic-moray.ngrok-free.app/admin/getAdminByEmailPassword', {
    //             email: adminDetails.email,
    //             password: adminDetails.password
    //         });
    //         const admin = res.data.data[0];
    //         console.log(admin)
    //         if(admin.email == adminDetails.email && admin.password == adminDetails.password) {
    //             setAdminID(admin._id);
    //             setUserDetails(admin);
    //             setIsAdminCreate(false);
                
    //             toast.success('Login Successful');
    //             setTimeout(() => {
    //                 navigate('/dashboard');
    //             }, 2000);
    //         } else {
    //             toast.error('Invalid Credentials');
    //         }
    //     } catch (error) {
    //         console.error("Login Error:", error);
    //         return false;
    //     }
    // };

    const checkAdmin = async () => {
        const fetchPromise = axios.post('https://really-classic-moray.ngrok-free.app/admin/getAdminByEmailPassword', {
          email: adminDetails.email,
          password: adminDetails.password
        });
      
        toast.promise(fetchPromise, {
          loading: 'Checking admin...',
          success: (res) => {
            const admin = res.data.data[0];
      
            if (admin.email === adminDetails.email && admin.password === adminDetails.password) {
              setAdminID(admin._id);
              setUserDetails(admin);
              setIsAdminCreate(false);
      
              setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
      
              return 'Login Successful';
            } else {
              throw new Error('Invalid Credentials');
            }
          },
          error: (err) => err.message || 'Login Failed!',
        });
      };
      

    const checkAdminCreate = () => {
        if (isAdminCreate) {
            navigate('/createAccount');
        } else {
            toast.error('Please Turn on Admin Create Account');
        }
    };

    return (
        <div className='w-full h-screen flex flex-row px-40 justify-between bg-black py-40'>
            <div className='w-[40%] flex flex-row items-center gap-5 justify-center'>
                <img src={coin} className='w-24' alt="coin" />
                <p className='text-white text-5xl'>Gold Coin</p>
            </div>
            <div className='w-[2px] bg-white rounded-full'></div>
            <div className='w-[60%] text-white flex flex-col px-20 items-center justify-between py-20'>
                <div>
                    <p className='text-center text-5xl mb-5 font-semibold'>Welcome</p>
                    <p className='text-center text-gray-400 text-xl'>Please Login to Admin Dashboard</p>
                </div>

                <div className='flex flex-col gap-5 w-full items-center'>
                    <input
                        value={adminDetails.email}
                        onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                        placeholder='Enter Your Email'
                        className='w-2/3 px-5 py-2 rounded-md text-black text-xl'
                        type="text"
                    />
                    <input
                        value={adminDetails.password}
                        onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
                        placeholder='Enter Password'
                        className='w-2/3 px-5 py-2 rounded-md text-black text-xl'
                        type="password"
                    />
                </div>

                <div className='flex flex-col gap-5 w-full items-center'>
                    <button
                        onClick={checkAdmin}
                        className='px-20 py-3 bg-violet-500 rounded-md font-semibold text-xl'
                    >
                        LOG IN
                    </button>
                    <div className='flex flex-row gap-2 text-[18px]'>
                        <p>Forgotten Your Password?</p>
                        <button
                            onClick={() => {
                                if (userDetails?._id) {
                                    navigate(`/updateAdmin/${userDetails._id}`);
                                } else {
                                    toast.error('Please login first');
                                }
                            }}
                            className='text-violet-400'
                        >
                            Forget Password
                        </button>
                    </div>
                </div>

                <div>
                    <button
                        onClick={checkAdminCreate}
                        className='px-20 py-3 bg-violet-500 rounded-md font-semibold text-xl'
                    >
                        CREATE ACCOUNT
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
