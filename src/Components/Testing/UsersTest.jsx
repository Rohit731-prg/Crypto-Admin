import React, { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";

function UsersTest() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    country: "",
    address: "",
  });
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    const data = {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      phone: userDetails.phone,
      dateOfBirth: userDetails.dateOfBirth,
      country: userDetails.country,
      address: userDetails.address,
      photo: photo,
      file: file, // This will be the encrypted file
    };

    try {
      const res = await axios.post("http://localhost:4000/user/insert", data);
      console.log(res.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const encryptPDF = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
      const encrypted = CryptoJS.AES.encrypt(
        wordArray,
        "your-secret-key"
      ).toString();
      setFile(encrypted);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      encryptPDF(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  return (
    <div>
      <input
        value={userDetails.name}
        onChange={(e) =>
          setUserDetails({ ...userDetails, name: e.target.value })
        }
        placeholder="Name"
        className="px-5 py-2 rounded-md text-xl"
        type="text"
      />
      <input
        value={userDetails.email}
        onChange={(e) =>
          setUserDetails({ ...userDetails, email: e.target.value })
        }
        placeholder="Email"
        className="px-5 py-2 rounded-md text-xl"
        type="email"
      />
      <input
        value={userDetails.password}
        onChange={(e) =>
          setUserDetails({ ...userDetails, password: e.target.value })
        }
        placeholder="Password"
        className="px-5 py-2 rounded-md text-xl"
        type="password"
      />
      <input
        value={userDetails.phone}
        onChange={(e) =>
          setUserDetails({ ...userDetails, phone: e.target.value })
        }
        placeholder="phone"
        className="px-5 py-2 rounded-md text-xl"
        type="password"
      />
      <input
        value={userDetails.dateOfBirth}
        onChange={(e) =>
          setUserDetails({ ...userDetails, dateOfBirth: e.target.value })
        }
        placeholder="phone"
        className="px-5 py-2 rounded-md text-xl"
        type="date"
      />
      <input
        value={userDetails.country}
        onChange={(e) =>
          setUserDetails({ ...userDetails, country: e.target.value })
        }
        placeholder="phone"
        className="px-5 py-2 rounded-md text-xl"
        type="text"
      />
      <input
        value={userDetails.country}
        onChange={(e) =>
          setUserDetails({ ...userDetails, country: e.target.value })
        }
        placeholder="phone"
        className="px-5 py-2 rounded-md text-xl"
        type="text"
      />

      <p>Photo</p>
      <input
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }}
        className="px-5 py-2 rounded-md text-xl"
        type="file"
      />

      <p>PDF File</p>
      <input
        accept="application/pdf"
        onChange={handleFileChange}
        className="px-5 py-2 rounded-md text-xl"
        type="file"
      />

      <button
        onClick={handleSubmit}
        className="px-10 py-3 text-xl font-semibold bg-violet-600 rounded-full mt-10"
      >
        Submit
      </button>
    </div>
  );
}

export default UsersTest;
