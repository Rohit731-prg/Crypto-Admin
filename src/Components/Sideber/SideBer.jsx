import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { IoManSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";

function SideBer() {
    const navigate = useNavigate();
  const [isActive, setActive] = useState(0);
  const adminDetails = {
    img: "data:image/jpeg;base64,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",
    name: "Blaze",
  };

  const handelChage = (id) => {
    setActive(id);
    console.log(id);

    switch(id) {
        case 1: {
            navigate("/")
            break;
        }
        case 2: {
            navigate("/market")
            break;
        }
        case 3: {
            navigate("/kyc")
            break;
        }
        case 4: {
          navigate('/users')
          break;
        }
        case 5: {
          navigate('/Transactions')
          break;
        }
    }
  }
  return (
    <div className="w-1/5 h-screen bg-[#212121] py-20 flex flex-col items-center text-white">
      <img src={adminDetails.img} className="w-1/2 rounded-full" />
      <p className="mt-5 text-4xl font-semibold">{adminDetails.name}</p>

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
            id: 5
          }
        ].map((item) => (
          <button
          key={item.id}
            onClick={() => handelChage(item.id)}
            className={`text-white flex flex-row items-center gap-3 w-full px-5 py-2 my-5 ${
              isActive == item.id ? "bg-black" : null
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideBer;
