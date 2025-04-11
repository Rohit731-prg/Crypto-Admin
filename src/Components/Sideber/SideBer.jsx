import React, { useContext, useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { IoManSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import axios from "axios";
import user from "../../assets/user.png";
import { APIContext } from "../../store/APIContext";
import toast, { Toaster } from 'react-hot-toast';

function SideBer() {
  const { adminID } = useContext(APIContext); 
  const { isAdminCreate, setIsAdminCreate } = useContext(APIContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setActive] = useState(0);
  const [details, setDetails] = useState(null);
  const handelChage = (id) => {
    setActive(id);
    console.log(id);

    switch (id) {
      case 1: {
        navigate("/dashboard");
        break;
      }
      case 2: {
        navigate("/market");
        break;
      }
      case 3: {
        navigate("/kyc");
        break;
      }
      case 4: {
        navigate("/users");
        break;
      }
      case 5: {
        navigate("/transactions");
        break;
      }
      case 6: {
        navigate("/pendingTransactions");
        break;
      }
    }
  };

  const checkCreateAccount = () => {
    if (isAdminCreate) {
      navigate("/createAccount");
    } else {
      toast.error("Please create an account first");
    }
  };

  const fetchData = async () => {
    console.log(adminID);
    try {
      const res = await axios.post("http://localhost:4000/admin/getAdminByID", { id: adminID });
      const data = res.data.data;
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="w-1/5 h-auto bg-[#212121] py-20 flex flex-col items-center text-white">
      <img
        src={details == null ? user : details.image}
        alt="User Image"
        className="w-40 h-40 rounded-full object-cover"
      />
      <p className="mt-5 text-4xl font-semibold">
        {details == null ? "Admin" : details.name}
      </p>
      <div className="mt-14 w-full text-xl px-3">
        {[
          {
            icon: <MdDashboard />,
            name: "Dashboard",
            id: 1,
          },
          {
            icon: <VscGraphLine />,
            name: "Market",
            id: 2,
          },
          {
            icon: <IoManSharp />,
            name: "KYC",
            id: 3,
          },
          {
            icon: <FaUsers />,
            name: "Users",
            id: 4,
          },
          {
            icon: <AiOutlineTransaction />,
            name: "Transactions",
            id: 5,
          },
          {
            icon: <AiOutlineTransaction />,
            name: "Pending Transactions",
            id: 6,
          },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handelChage(item.id)}
            className={`text-white flex flex-row items-center gap-3 w-full px-5 py-3 my-5 ${
              isActive == item.id ? "bg-black" : null
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox"
        onChange={() => setIsAdminCreate(!isAdminCreate)}
        value={isAdminCreate} class="sr-only peer" />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-base font-medium text-gray-900 dark:text-gray-300">
          {isAdminCreate ? "Admin can create" : "Turn on to Create  Admin"}
        </span>
      </label>

      <div className="mt-10 px-5">
        <button
          onClick={checkCreateAccount}
          className="px-10 py-3 bg-violet-500 rounded-md font-semibold text-xl"
        >
          CREATE ACCOUNT
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default SideBer;
