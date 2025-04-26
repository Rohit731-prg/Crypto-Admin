import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import Loading from "../../assets/loading.json";
import Lottie from "lottie-react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

function Message() {
  const [users, setUsers] = useState(null);
  const [details, setDetails] = useState(null);
  const [SelectedUser, setSelectedUser] = useState(null);

  const [adminMessage, setAdminMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/user/get", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      console.log(res.data.data);
      const updatedUser = res.data.data.filter(
        (user) => user.authorized == "Authorized"
      );
      setUsers(updatedUser);
    } catch (error) {
      console.log("error from fetchUsers", error);
    }
  };

  const sendMessage = async () => {
    const data = {
      content: adminMessage,
      owner: "admin",
    };

    try {
      const res = await axios.put(
        `https://really-classic-moray.ngrok-free.app/message/update/${SelectedUser}`,
        data
      );
      console.log(res);
      console.log(res.data.status);

      if (res.data.status === true) {
        toast.success("Message Sent Successfully");
        setAdminMessage("");
        fetchdetails(SelectedUser);
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const fetchdetails = async (id) => {
    setSelectedUser(id);
    try {
      const res = await axios.post(
        `https://really-classic-moray.ngrok-free.app/message/getMessagesByUser/${id}`
      );
      console.log(res.data.data);
      setDetails(res.data.data[0].messages); // <-- full array, not res.data.data[0]
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full text-white h-screen bg-gradient-to-b from-[#151515] to-[#1a1a2e]">
      <nav className="mt-5 flex flex-row justify-between items-center px-20">
        <p className="text-4xl">Message</p>
        <div className="flex flex-row items-center justify-between bg-black px-5 py-3 w-1/2 rounded-full">
          <p className="text-2xl">
            <IoReorderThree />
          </p>
          <input
            placeholder="Search Message"
            className="bg-transparent w-full mx-5 border-none outline-none"
            type="text"
          />

          <button>
            <FaSearch />
          </button>
        </div>
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

      {users == null ? (
        <div className="w-full h-full flex items-center justify-center">
          <div>
            <Lottie animationData={Loading} loop={true} className="w-20" />
          </div>
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <div className="mt-10 px-20 flex flex-col gap-10">
          <p>Messages</p>

          {users.length == 0 ? (
            <div>
              <p className="text-2xl">No User</p>
            </div>
          ) : (
            <div className="flex flex-row gap-5">
              <div className="w-1/3 flex flex-col p-3 bg-black rounded-md px-5 h-[750px]">
                <p className="text-2xl px-10 py-2 font-semibold bg-gray-500 w-fit rounded-sm mb-5">
                  Users
                </p>
                {users.map((user) => (
                  <button
                    onClick={() => fetchdetails(user._id)}
                    className={`${
                      SelectedUser == user._id ? "bg-violet-600" : ""
                    } rounded-lg w-full flex flex-row items-center justify-between px-5 py-3`}
                  >
                    <div className="flex flex-row items-start gap-5">
                      <img
                        className="w-20 h-20 object-cover rounded-full"
                        src={user.photo}
                        alt=""
                      />

                      <div className="py-4">
                        <p>{user.fullName}</p>
                        <p></p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="w-2/3">
                {details == null ? (
                  <div className="w-full h-full flex items-center justify-center bg-black rounded-md">
                    <p className="text-2xl">
                      Select a user to start a conversation
                    </p>
                  </div>
                ) : (
                  <div className="bg-black h-full w-full p-5 flex flex-col justify-between">
                    <p className="text-2xl px-10 py-2 font-semibold bg-gray-500 w-fit rounded-sm mb-5">
                      Message
                    </p>

                    <div className="flex flex-col gap-4 h-[600px] overflow-y-auto p-4 rounded-md">
                      {details.map((sms, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            sms.owner === "admin"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg text-white ${
                              sms.owner === "admin"
                                ? "bg-violet-600 rounded-br-none"
                                : "bg-gray-600 rounded-bl-none"
                            }`}
                          >
                            <p className="break-words">{sms.message}</p>
                            <p className="text-xs text-gray-300 mt-1 text-right">
                              {sms.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row px-10 gap-10 bg-black">
                      <input
                        value={adminMessage}
                        onChange={(e) => setAdminMessage(e.target.value)}
                        placeholder="Type a message.."
                        className="w-full px-5 py-2 bg-black border-b-2 border-violet-600 outline-none"
                        type="text"
                      />
                      <button
                        onClick={() => sendMessage()}
                        className="text-violet-600 text-4xl"
                      >
                        <IoSend />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default Message;
