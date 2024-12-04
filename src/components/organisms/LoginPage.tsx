import React, { useEffect } from "react";
import OtpInput from "../atoms/OtpInput.tsx";
import Button from "../atoms/Button.tsx";
import { useState, useRef } from "react";
import { APP_ROUTES } from "../../CommonConstants.ts";
import { useNavigate } from "react-router-dom";
import { Header } from "../atoms/Header.tsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const [errorFields, setError] = useState({ userName: "", otp: "" });
  const formData = useRef();
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const validatedFormFields = () => {
    const userName = formData.current?.userName.value;
    if (!userName) {
      setError((prev) => ({ ...prev, userName: "Invalid User Name" }));
      return;
    }
    const formElements = formData.current.elements;
    const otp = Array.from(formElements).filter((input) =>
      input.name.startsWith("otp-")
    );
    const otpString = otp.reduce((acc, current) => (acc += current.value), "");
    if (otpString.length < 4) {
      setError((prev) => ({ ...prev, otp: "Please complete otp" }));
      return;
    }
    formData.current.username = userName;
    formData.current.otp = otpString;
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidated = validatedFormFields();

    if (isValidated) {
      const { username, otp } = formData.current;
      setLoader(true);
      try {
        const response = await fetch(
          "https://assignment.stage.crafto.app/login",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ username, otp }),
          }
        );

        if (response.ok) {
          const authToken = await response.json();
          localStorage.setItem("authToken", authToken.token);
          setLoader(false);
          toast("Login success!",{position:'bottom-left'});
          navigate(APP_ROUTES.QUOTES_LIST);
        }
      } catch (error) {
        console.log("ERROR", error);
        toast("Login failed!");
        setLoader(false);
        setError((prev) => ({ ...prev, otp: "Invalid OTP" }));
      }
    }
  };
  return (
    <>
      <div className="w-screen absolute  top-1/4 ">
        <div className="text-left flex flex-col   md:mx-auto  px-3  items-center text-stone-900  dark:text-white font-sourGummy font-semibold gap-y-6 md:gap-10 text-xl ">
          <Header text={"Welcome To Quote Craft !"} />
          <form ref={formData} className="flex flex-col gap-y-3 md:gap-y-6">
            <div className="flex flex-col gap-y-2">
              <label className="text-left font-semibold md:text-2xl ">
                User Name*:
              </label>

              <input
                name="userName"
                placeholder={"Enter your name"}
                onChange={() => {
                  if (errorFields.userName) {
                    setError((prev) => ({ ...prev, userName: "" }));
                  }
                }}
                className="border-2 border-stone-800  h-12 w-auto md:w-80 p-3 font-normal  dark:border-stone-400 
        dark:bg-stone-700 dark:text-white dark:focus:ring-2 dark:focus:ring-orange-500"
              />
              {errorFields.userName && (
                <p className="text-red-500">{errorFields.userName}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-left font-semibold md:text-2xl">
                Enter OTP*:
              </label>

              <OtpInput setError={setError} />
              {errorFields.otp && (
                <p className="text-red-500">{errorFields.otp}</p>
              )}
            </div>
            <Button
              text={loader ? "Submitting..." : "Submit"}
              onClick={(e) => handleSubmit(e)}
              className="text-lg  items-center font-semibold md:text-2xl"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

// import { useState } from 'react';

// const LoginPage = ({ onLoginSuccess }) => {
//   const [username, setUsername] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('https://assignment.stage.crafto.app/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, otp }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('authToken', data.token); // Store token
//         onLoginSuccess();
//       } else {
//         setError('Invalid credentials');
//       }
//     } catch (error) {
//       setError('Something went wrong');
//     }
//   };

//   return (
//     <div className="max-w-xs mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//         placeholder="Username"
//       />
//       <input
//         type="text"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//         placeholder="OTP"
//       />
//       {error && <p className="text-red-500">{error}</p>}
//       <button
//         onClick={handleLogin}
//         className="w-full bg-blue-500 text-white p-2 rounded mt-4"
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default LoginPage;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const QuoteListPage = () => {
//   const [quotes, setQuotes] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const navigate = useNavigate();

//   const fetchQuotes = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('authToken');
//     const response = await fetch(`https://assignment.stage.crafto.app/getQuotes?limit=10&offset=${offset}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
//     if (data.length > 0) {
//       setQuotes((prev) => [...prev, ...data]);
//       setOffset(offset + 10);
//     } else {
//       setHasMore(false);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchQuotes();
//   }, [offset]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Quotes</h2>
//       <div className="space-y-4">
//         {quotes.map((quote) => (
//           <div key={quote.id} className="relative p-4 border rounded-lg">
//             <img src={quote.mediaUrl} alt="quote" className="w-full h-64 object-cover rounded-md" />
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded">
//               {quote.text}
//             </div>
//             <div className="mt-2 text-sm text-gray-500">
//               <p>{quote.username}</p>
//               <p>{new Date(quote.createdAt).toLocaleString()}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {hasMore && !loading && (
//         <button
//           onClick={fetchQuotes}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
//         >
//           Load more
//         </button>
//       )}

//       <button
//         onClick={() => navigate('/create')}
//         className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg"
//       >
//         +
//       </button>
//     </div>
//   );
// };

// export default QuoteListPage;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const QuoteCreationPage = () => {
//   const [quoteText, setQuoteText] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);

//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await fetch('https://crafto.app/crafto/v1.0/media/assignment/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await response.json();
//     return data.mediaUrl;
//   };

//   const handleCreateQuote = async () => {
//     setLoading(true);
//     const mediaUrl = await handleImageUpload({ target: { files: [imageFile] } });
//     const token = localStorage.getItem('authToken');

//     const response = await fetch('https://assignment.stage.crafto.app/postQuote', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         text: quoteText,
//         mediaUrl: mediaUrl,
//       }),
//     });

//     if (response.ok) {
//       navigate('/quotes');
//     } else {
//       alert('Failed to create quote');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Create a Quote</h2>
//       <input
//         type="text"
//         value={quoteText}
//         onChange={(e) => setQuoteText(e.target.value)}
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//         placeholder="Enter your quote"
//       />
//       <input
//         type="file"
//         onChange={(e) => handleImageUpload(e)}
//         className="mb-4"
//       />
//       <button
//         onClick={handleCreateQuote}
//         className="w-full bg-blue-500 text-white p-2 rounded mt-4"
//         disabled={loading}
//       >
//         {loading ? 'Creating...' : 'Create Quote'}
//       </button>
//     </div>
//   );
// };

// export default QuoteCreationPage;
