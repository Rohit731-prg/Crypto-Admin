import React, { useContext, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { IoManSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { APIContext } from "../../store/APIContext";

function SideBer() {
    const navigate = useNavigate();
  const [isActive, setActive] = useState(0);
  const {userDetails} = useContext(APIContext);

  const handelChage = (id) => {
    setActive(id);
    console.log(id);

    switch(id) {
        case 1: {
            navigate("/dashboard")
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
          navigate('/transactions')
          break;
        }
        case 6: {
          navigate('/pendingTransactions')
          break;
        }
    }
  }
  return (
    <div className="w-1/5 h-screen bg-[#212121] py-20 flex flex-col items-center text-white">
      <img src={'data:image/png;base64,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'} className="w-1/2 rounded-full" />
      <p className="mt-5 text-4xl font-semibold">{userDetails.name}</p>

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
          },
          {
            icon: <AiOutlineTransaction />,
            name: "Pending Transactions",
            id: 6
          }
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
    </div>
  );
}

export default SideBer;
