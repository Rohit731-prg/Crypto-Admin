import React, { useState } from "react";
import coin from "../../assets/coin.png";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();

  const [adminInputDetails, setAdminInputDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [adminPhoto, setAdminPhoto] = useState(null);

  const haandelChange = async (e) => {
    e.preventDefault();
    if (adminInputDetails.password === adminInputDetails.confirmPassword) {
      if (
        adminInputDetails.password.length > 8 &&
        adminInputDetails.confirmPassword.length < 16
      ) {
        const formData = {
          name: `${adminInputDetails.firstName} ${adminInputDetails.lastName}`,
          email: adminInputDetails.email,
          password: adminInputDetails.password,
          image: adminPhoto,
        };
        const res = await axios.post(
          "https://really-classic-moray.ngrok-free.app/admin/insert",
          formData
        );

        if (res.data.success === true) {
          toast.success("Account Created Successfully");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          toast.error("Internal Server Error");
        }
      } else {
        toast.error("Password length should be more than 8 and less than 16");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="bg-black w-full h-screen flex flex-row items-center justify-center py-40 gap-20">
      <div className="w-[40%] flex flex-row justify-end items-center">
        <img src={coin} alt="" className="w-40" />
        <p className="text-5xl text-white font-bold">Create Account Admin</p>
      </div>
      <div className="w-[2px] h-full bg-white rounded-full"></div>

      <form onSubmit={haandelChange} className="w-[60%] flex flex-col gap-10">
        <div className="mb-10">
          <p className="text-white text-5xl mb-5 font-semibold">Welcome!</p>
          <p className="text-gray-400 text-xl">
            Please sign in to access the Admin Dashboard.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pr-10">
          <input
            value={adminInputDetails.firstName}
            onChange={(e) =>
              setAdminInputDetails({
                ...adminInputDetails,
                firstName: e.target.value,
              })
            }
            placeholder="Frist Name"
            className="px-5 py-2 rounded-md text-xl"
            type="text"
            required
          />
          <input
            value={adminInputDetails.lastName}
            onChange={(e) =>
              setAdminInputDetails({
                ...adminInputDetails,
                lastName: e.target.value,
              })
            }
            placeholder="Last Name"
            className="px-5 py-2 rounded-md text-xl"
            type="text"
            required
          />
          <input
            value={adminInputDetails.email}
            onChange={(e) =>
              setAdminInputDetails({
                ...adminInputDetails,
                email: e.target.value,
              })
            }
            placeholder="Email ID"
            className="px-5 py-2 rounded-md text-xl"
            type="email"
            required
          />
          <input
            value={adminInputDetails.password}
            onChange={(e) =>
              setAdminInputDetails({
                ...adminInputDetails,
                password: e.target.value,
              })
            }
            placeholder="Create Password"
            className="px-5 py-2 rounded-md text-xl"
            type="password"
            required
          />
          <input
            value={adminInputDetails.confirmPassword}
            onChange={(e) =>
              setAdminInputDetails({
                ...adminInputDetails,
                confirmPassword: e.target.value,
              })
            }
            placeholder="Confirm Password"
            className="px-5 py-2 rounded-md text-xl"
            type="password"
            required
          />
        </div>

        <div>
          <p className="text-gray-300 mb-2 text-xl">Upload Admin Photo</p>
          <input
            accept="image/*"
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = () => setAdminPhoto(reader.result);
              reader.readAsDataURL(e.target.files[0]);
            }}
            required
            type="file"
            className="file:border text-white file:border-gray-300 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:hover:bg-blue-600"
          />
        </div>

        <div className="text-white mt-10">
          <button
            type="submit"
            className="px-20 py-3 bg-violet-500 rounded-md font-semibold text-xl"
          >
            CREATE ACCOUNT
          </button>
        </div>
        <div>
          <button 
          onClick={() => navigate("/")}
          className="text-white text-xl bg-violet-600 px-10 py-3 rounded-md font-semibold">Back</button>
        </div>
      </form>

      <Toaster />
    </div>
  );
}

export default CreateAccount;
