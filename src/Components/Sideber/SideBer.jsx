import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { IoManSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import axios from "axios";
import user from "../../assets/user.png";

function SideBer() {
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

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/getAdminById");
      const data = res.data.data;
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="w-1/5 h-screen bg-[#212121] py-20 flex flex-col items-center text-white">
      <img
        src={details == null ? user : details.image}
        alt="User Image"
        className="w-40 h-40 rounded-full"
      />
      <p className="mt-5 text-4xl font-semibold">
        {details == null ? "Admin" : details.name}
      </p>
      <div className="mt-20 w-full text-xl px-3">
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

      <div className="mt-14 px-5">
        <button
          onClick={() => navigate('/createAccount')}
          className="px-10 py-3 bg-violet-500 rounded-md font-semibold text-xl"
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
}

export default SideBer;
