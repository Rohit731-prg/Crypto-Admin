import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";

function KYCrequect() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users data
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("/users/get");
      setUsers(res.data.data || []);
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
      await axios.put("/users/updateAuthentication", { id });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      {/* Navbar */}
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">KYC Request</p>
        <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
          <p>
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
        <p className="text-5xl">
          <IoIosNotifications />
        </p>
      </nav>

      {/* Loading State */}
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <div className="px-40 py-10">
          <div className="mt-20 px-10 py-5 bg-black rounded-lg max-h-[700px] overflow-y-auto">
            <p className="text-xl mb-10 inline-flex flex-row items-center gap-5 px-5 py-3 bg-[#616161] rounded-md">
              <span className="text-4xl text-red-400">
                <MdErrorOutline />
              </span>
              <span>PENDING INFORMATION</span>
            </p>

            {users.filter((user) => !user.authorized).length === 0 ? (
              <p className="text-gray-400">No pending KYC requests</p>
            ) : (
              users
                .filter((user) => !user.authorized)
                .map((user) => (
                  <div key={user._id} className="mb-10 border-b-2 border-white">
                    <p className="text-xl text-gray-300">Full Name</p>
                    <p className="text-lg bg-white text-black p-3 rounded-md mt-2">
                      {user.name}
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
                          value: new Date(user.createdAt).toLocaleDateString(),
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
    </div>
  );
}

export default KYCrequect;
