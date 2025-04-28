import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaDownload } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json"; // Animation file

function User() {
  const navigate = useNavigate();

  const [users, setUsers] = useState(null); // To store all users
  const [details, setDetails] = useState(null); // To store selected user details
  const [searchTerm, setSearchTerm] = useState(""); // For search bar

  // Fetch users function
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/user/get", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = res.data.data;
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // Handle selecting user
  const seeDetails = (user) => {
    setDetails(user);
  };

  // Download PDF function
  const downloadPDF = async (user) => {
    try {
      const base64String = user?.file;
      if (!base64String) {
        alert("No file found for this user.");
        return;
      }

      const byteCharacters = atob(
        base64String.includes(",") ? base64String.split(",")[1] : base64String
      );
      const byteNumbers = Array.from(byteCharacters).map((char) =>
        char.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${user.fullName}_${user._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5">
        <h1 className="text-3xl font-bold">Users</h1>

        {/* Search bar */}
        <div className="flex items-center bg-gray-800 rounded-full shadow-lg px-5 py-2 w-1/2">
          <IoReorderThree className="text-2xl text-gray-400" />
          <input
            type="text"
            placeholder="Search User"
            className="bg-transparent outline-none mx-3 w-full text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-gray-400 cursor-pointer" />
        </div>

        {/* Logout button */}
        <button
          onClick={() => navigate("/")}
          className="relative group flex items-center justify-center w-11 h-11 bg-violet-600 rounded-full overflow-hidden transition-all duration-300 hover:w-32"
        >
          <svg className="w-5 h-5" viewBox="0 0 512 512" fill="white">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9-18.7 0-33.9-15.2-33.9-33.9v-62.1h-128c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9 9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V128C0 75 43 32 96 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
          <span className="absolute right-5 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300 text-white font-semibold text-sm">
            Logout
          </span>
        </button>
      </nav>

      {/* Main content */}
      {users === null ? (
        // Loading State
        <div className="flex justify-center items-center h-[70vh]">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24">
              <Lottie animationData={loading} loop />
            </div>
            <p className="text-xl font-semibold mt-4">Loading...</p>
          </div>
        </div>
      ) : (
        // After Loading
        <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Users List */}
          <div className="bg-gray-950 p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            {users
              .filter(
                (user) =>
                  user.fullName &&
                  user.fullName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                  user.authorized === "Authorized"
              )
              .map((user, index) => (
                <button
                  key={index}
                  onClick={() => seeDetails(user)}
                  className="block w-full text-left p-4 rounded-md hover:bg-gray-800 transition-all mb-2"
                >
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-gray-400 text-sm">
                    Coin Hold: <span className="text-white">{user.coin}</span>
                  </p>
                </button>
              ))}
          </div>

          {/* User Details */}
          <div className="col-span-2 bg-gray-950 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            {details === null ? (
              <div className="flex items-center justify-center h-[300px] text-gray-400">
                Select a user to view details
              </div>
            ) : (
              <div>
                {details.photo && (
                  <img
                    src={details.photo}
                    alt="User Photo"
                    className="w-full md:w-1/2 h-[300px] object-cover rounded-md mb-6"
                  />
                )}
                <h3 className="text-2xl font-bold">{details.fullName}</h3>
                <p className="text-gray-400 mt-1">
                  Country: <span className="text-white">{details.country}</span>
                </p>
                <p className="text-gray-400 mt-2">
                  Total Coin: <span className="text-white">{details.coin}</span>
                </p>

                <div className="mt-6 border-t border-gray-700 pt-4">
                  <h4 className="text-lg font-semibold mb-4">Basic Details</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <p className="text-gray-400">
                      Email:{" "}
                      <span className="text-blue-400">{details.email}</span>
                    </p>
                    <p className="text-gray-400">
                      Phone No:{" "}
                      <span className="text-blue-400">{details.phone}</span>
                    </p>
                    <p className="text-gray-400">
                      Date of Birth:{" "}
                      <span className="text-white">
                        {new Date(details.dateOfBirth).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Created At:{" "}
                      <span className="text-white">
                        {new Date(details.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-400 mt-4">
                    Last Update:{" "}
                    <span className="text-white">
                      {new Date(details.updatedAt).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-400 mt-4">
                    Address:{" "}
                    <span className="text-white">{details.address}</span>
                  </p>

                  {/* Download PDF */}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => downloadPDF(details)}
                      className="flex items-center gap-3 bg-violet-600 px-6 py-3 rounded-full hover:bg-violet-700 transition-all"
                    >
                      <FaDownload />
                      <span>Download ID Proof</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
