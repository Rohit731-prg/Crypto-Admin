import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { FaDownload } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from '../../assets/loading.json';
import Lottie from "lottie-react";

function KYCrequect() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [fileName, setFileName] = useState("Downloaded_File");
  const [fileUrl, setFileUrl] = useState(null);

  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(0);

  // Fetch users data
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("/users/get");
      console.log(res.data.data);
      setUsers(res.data.data);
      setLength(res.data.data.filter((user) => user.authorized != "Authorized").length);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Update user authentication
  const updateUser = async (id) => {
    try {
      await axios.put("/users/updateAuthentication", {
        id: id,
        authorized: 'Authorized',
      });
      toast.success("User verified successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const downloadIdProof = (user) => {
    console.log(user.file);
    try {
      // Extract base64 content
      const base64String = user.file;

      // Decode base64 string to binary data
      const byteCharacters = atob(base64String.split(",")[1] || base64String);
      const byteNumbers = Array.from(byteCharacters).map((char) =>
        char.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);

      // Create a Blob and Object URL
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Create a temporary download link
      const a = document.createElement("a");
      a.href = url;
      a.download = `${user.username}_${user._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading ID Proof:", error);
      toast.error("Failed to download the ID proof.");
    }
  };

  return (
    <div className="w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      {/* Navbar */}
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">KYC Request</p>
        <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
          <p className="text-2xl">
            <IoReorderThree />
          </p>
          <input
            placeholder="Search KYC Request"
            className="bg-transparent w-full mx-5 border-none outline-none"
            type="text"
          />
          <button>
            <FaSearch />
          </button>
        </div>
        <p className="text-5xl flex flex-row items-start gap-0">
          <IoIosNotifications />
          <span className="text-[18px] bg-red-500 p-2 rounded-full">
            {length}
          </span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="group flex items-center justify-start w-11 h-11 bg-violet-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32  active:translate-x-1 active:translate-y-1"
        >
          <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            Logout
          </div>
        </button>
      </nav>

      {/* Loading State */}
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div>
            <Lottie animationData={Loading} loop={true} className="w-20" />
          </div>
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <div className="mt-40 px-40">
          <div className="mt-20 px-10 py-5 bg-black rounded-lg max-h-[700px] overflow-y-auto">
            <p className="text-xl mb-10 inline-flex flex-row items-center gap-5 px-5 py-3 bg-[#616161] rounded-md">
              <span className="text-4xl text-red-400">
                <MdErrorOutline />
              </span>
              <span>PENDING INFORMATION</span>
            </p>

            {users.filter((user) => user.authorized !== "Authorized").length === 0 ? (
              <p className="text-gray-400">No pending KYC requests</p>
            ) : (
              users
                .filter((user) => user.authorized != "Authorized")
                .map((user) => (
                  <div key={user._id} className="mb-10 border-b-2 border-white">
                    <img
                      src={user.photo}
                      alt="User Image"
                      className="w-48 h-48 object-cover rounded-full mb-10"
                    />
                    <p className="text-xl text-gray-300">Full Name</p>
                    <p className="text-lg bg-white text-black p-3 rounded-md mt-2">
                      {user.fullName}
                    </p>
                    <p className="text-xl text-gray-300 mt-3">Date of Birth</p>
                    <p className="text-lg bg-white text-black p-3 rounded-md mt-2">
                      {user.dateOfBirth}
                    </p>

                    <div className="flex flex-wrap gap-x-10">
                      {[
                        { title: "Home Address", value: user.address },
                        { title: "Country Of Residence", value: user.country },
                        { title: "Email Address", value: user.email },
                        { title: "Phone Number", value: user.phone },
                        {
                          title: "Created At",
                          value: new Date(user.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          ),
                        },
                      ].map((item, index) => (
                        <div key={index} className="w-[30%]">
                          <p className="text-xl text-gray-300 mt-3">
                            {item.title}
                          </p>
                          <p className="text-lg bg-white text-black p-3 rounded-md mt-2">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex justify-end">
                      <button
                        onClick={() => downloadIdProof(user)}
                        className="flex flex-row items-center gap-2 bg-violet-600 px-10 py-3 rounded-full text-xl font-semibold"
                      >
                        <FaDownload />
                        <p>Download Id Proof</p>
                      </button>
                    </div>
                    <div className="w-full flex justify-start my-8">
                      <button
                        onClick={() => updateUser(user._id)}
                        className="bg-purple-100 px-20 py-3 text-xl font-semibold rounded-lg text-violet-800 flex flex-row items-center gap-2"
                      >
                        <span className="text-2xl">
                          <GoPencil />
                        </span>
                        Verify KYC
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default KYCrequect;
