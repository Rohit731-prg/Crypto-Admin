import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";

function User() {
  const [users, setUsers] = useState(null);
  const [details, setDetails] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users/get");
      const data = res.data.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const seeDetails = (details) => {
    setDetails(details);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      {/* Navbar */}
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex items-center bg-gray-800 px-5 py-2 rounded-full shadow-lg w-1/2">
          <IoReorderThree className="text-2xl text-gray-400" />
          <input
            placeholder="Search Market"
            className="bg-transparent w-full mx-3 text-white outline-none"
            type="text"
          />
          <FaSearch className="text-gray-400 cursor-pointer" />
        </div>
        <button
          onClick={() => navigate("/")}
          className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32  active:translate-x-1 active:translate-y-1"
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

      <div className="px-40">
        {/* Main Content */}
        <div className="mt-40 grid md:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="bg-gray-950 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold bg-gray-800 px-4 py-2 inline-block rounded-md">
              Users
            </h2>
            <div className="mt-4 space-y-4">
              {users ? (
                users.map((user, index) =>
                  user.authorized ? (
                    <button
                      key={index}
                      onClick={() => seeDetails(user)}
                      className="block w-full text-left p-4 rounded-lg hover:bg-gray-800 transition-all"
                    >
                      <p className="text-lg font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">
                        Coin Hold:{" "}
                        <span className="text-white">{user.coin}</span>
                      </p>
                    </button>
                  ) : null
                )
              ) : (
                <p className="text-gray-400">Loading users...</p>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="col-span-2 bg-gray-950 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold bg-gray-800 px-4 py-2 inline-block rounded-md">
              User Details
            </h2>

            {/* Skeleton Loading */}
            {details == null ? (
              <div className="w-full h-40 flex items-center justify-center">
                <p className="text-gray-400">Select a user to view details</p>
              </div>
            ) : (
              <div className="mt-6">
                <img src={details.image} alt="" />
                <h3 className="text-2xl font-bold">{details.name}</h3>
                <p className="text-gray-400 mt-1">
                  Country: <span className="text-white">{details.country}</span>
                </p>
                <p className="text-gray-400 mt-2">
                  Total Coin: <span className="text-white">{details.coin}</span>
                </p>

                {/* Details Section */}
                <div className="mt-6 border-t border-gray-700 pt-4">
                  <h4 className="text-lg font-semibold">Basic Details</h4>
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
