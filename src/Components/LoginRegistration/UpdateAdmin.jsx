import React, { useContext, useState } from "react";
import Coin from "../../assets/coin.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { APIContext } from "../../store/APIContext";

function UpdateAdmin() {
  const navigate = useNavigate();
  const [isEmailApproved, setIsEmailApproved] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const {adminDetails, setAdminDetails} = useContext(APIContext);

  const checkEmail = async () => {
    const formData = {
        email: email,
        name: userName,
    }
    try {
        console.log(formData);
        const res = await axios.post('http://localhost:4000/admin/getAdminByName', {
            email: email,
            name: userName
        });
        console.log(res.data.data[0]);
        console.log(res.data.success);
        if(res.data.success === true) {
            console.log(res.data.data[0]);
            setAdminDetails(res.data.data[0]);
            setIsEmailApproved(true);
            toast.success('Email Approved')
        } else {
            toast.error('Email Not Approved')
        }
    } catch (error) {
        console.log(error);
    }
  };

  const setNewPassword = async () => {
    if (passwords.newPassword === passwords.confirmPassword) {
      console.log(adminDetails);
      const res = await axios.put('http://localhost:4000/admin/update', {id: adminDetails._id, password: passwords.newPassword});

      if(res.data.success === true) {
        toast.success('Password Updated Successfully')
        setTimeout(() => {
          navigate('/');
        }, 2000)
      } else {
        toast.error('Error updating password')
        console.log(res);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      {isEmailApproved ? (
        <div className="w-1/3 text-white flex flex-col">
          <img src={Coin} className="w-20 h-20" />
          <p className="text-3xl font-semibold text-white">
            Reset Your Password
          </p>
          <p className="text-gray-400 mt-3">
            Enter the email address you used to register with
          </p>

          <input
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            placeholder="Enter New Password"
            className="w-2/3 px-3 py-3 rounded-md outline-none text-black mt-10"
            type="email"
          />
          <input
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            placeholder="Enter Confirm Password"
            className="w-2/3 px-3 py-3 rounded-md outline-none text-black mt-10"
            type="email"
          />

          <button
            onClick={() => setNewPassword()}
            className="text-white px-20 py-3 mt-10 rounded-md outline-none bg-violet-600 text-lg font-semibold w-52"
          >
            SAVE
          </button>
        </div>
      ) : (
        <div className="w-1/3">
          <img src={Coin} className="w-20 h-20" />
          <p className="text-3xl font-semibold text-white">
            Reset Your Password
          </p>
          <p className="text-gray-400 mt-3">
            Enter the email address you used to register with
          </p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full px-3 py-3 rounded-md outline-none text-black mt-10"
            type="email"
          />

          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter Full Name"
            className="w-full px-3 py-3 rounded-md outline-none text-black mt-10"
            type="text"
          />

          <button
            onClick={() => checkEmail()}
            className="text-white px-20 py-3 mt-10 rounded-md outline-none bg-violet-600 text-lg font-semibold"
          >
            SEND
          </button>

          <div>
            <button 
            onClick={() => navigate('/')}
            className="text-white px-10 py-3 mt-5 rounded-md outline-none bg-violet-600 text-lg font-semibold">
              BACK
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default UpdateAdmin;
