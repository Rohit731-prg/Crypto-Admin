import React, { useContext, useState } from 'react'
import Coin from '../../assets/coin.png';
import { APIContext } from '../../store/APIContext';
import axios from 'axios';

function UpdateAdmin() {
    const { userDetails } = useContext(APIContext);
    const [isEmailApproved, setIsEmailApproved] =useState(false);
    const [email, setEmail] = useState('');
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const checkEmail = () => {
        console.log(userDetails.email, email);
        if(userDetails.email === email) {
            alert('Email Approved');
            setIsEmailApproved(true);
        } else {
            alert('Invalid Email');
        }
    };

    const setNewPassword = async () => {
        if(passwords.newPassword === passwords.confirmPassword) {
            if(userDetails.password === passwords.newPassword) {
                alert('New Password cannot be same as old password');
            } else {
                const data = {
                    id: userDetails._id,
                    name: userDetails.name,
                    email: userDetails.email,
                    password: passwords.newPassword
                }
                const res = await axios.put('http://localhost:4000/admin/update', data)
                console.log(res.data.status);
                if(res.data.status === true) {
                    alert('Password Updated Successfully');
                }
                alert('Internal Server Error');
            }
        } else {
            alert('Passwords do not match');
        }
    }

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
        {isEmailApproved ? (
            <div className='w-1/3 text-white flex flex-col'>
                <img src={Coin} className="w-20 h-20" />
                <p className='text-3xl font-semibold text-white'>Reset Your Password</p>
                <p className='text-gray-400 mt-3'>Enter the email address you used to register with</p>

                <input 
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                placeholder='Enter New Password'
                className='w-2/3 px-3 py-3 rounded-md outline-none text-black mt-10'
                type="email" />
                <input 
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                placeholder='Enter Confirm Password'
                className='w-2/3 px-3 py-3 rounded-md outline-none text-black mt-10'
                type="email" />

                <button
                onClick={() => setNewPassword()}
                className='text-white px-20 py-3 mt-10 rounded-md outline-none bg-violet-600 text-lg font-semibold w-52'
                >
                    SAVE
                </button>
            </div>
        ) : (
            <div className='w-1/3'>
                <img src={Coin} className="w-20 h-20" />
                <p className='text-3xl font-semibold text-white'>Reset Your Password</p>
                <p className='text-gray-400 mt-3'>Enter the email address you used to register with</p>

                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email'
                className='w-full px-3 py-3 rounded-md outline-none text-black mt-10'
                type="email" />

                <button
                onClick={() => checkEmail()}
                className='text-white px-20 py-3 mt-10 rounded-md outline-none bg-violet-600 text-lg font-semibold'
                >
                    SEND
                </button>
            </div>
        )}
    </div>
  )
}

export default UpdateAdmin