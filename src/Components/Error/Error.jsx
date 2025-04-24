import React from 'react';
import error from '../../assets/error.png';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();
  return (
    <div className='bg-black w-full h-screen flex flex-row justify-center items-center gap-20'>
        <img src={error} alt="error Image"
        className='w-[35%] h-[65%] rounded-full'
        />

        <div className='text-white '>
            <h1 className='text-8xl mb-10 font-mono'>Oops..!</h1>
            <p className='text-2xl text-gray-300'>look like you reload the page or something went wrong</p>

            <button
            onClick={() => navigate('/')}
            className='px-10 py-3 text-xl font-semibold bg-violet-600 rounded-full mt-10'
            >
                GO BACK
            </button>
        </div>
    </div>
  )
}

export default Error