import React, { useEffect, useRef } from "react";
import { useState } from "react";

const OtpInput = ({ length = 4,setError }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  console.log(6, otp);
  const inputRef = useRef([]);
  const handleChange = (e, index) => {
  
    let value = e.target.value;
    if (/[^0-9]/g.test(value)) return;
    console.log(8, index, inputRef);
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputRef.current[index + 1].current.focus();
    }
    setError(prev=>({...prev,otp:''}))
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRef.current[index - 1].current.focus();
    }
  };

  if (inputRef.current.length !== 4) {
    inputRef.current = otp.map(
      (_, index) => inputRef.current[index] || React.createRef()
    );
  }

  return (
    <>
      <div className="flex gap-3">
        {otp.map((_, index) => (
          <input
            type="text"
            name={`otp-${index}`}
            maxLength={1}
            className="w-12 h-12 rounded-sm focus:outline border border-stone-900 md:text-2xl text-center dark:border-stone-400 
        dark:bg-stone-700 dark:text-white dark:focus:ring-2 dark:focus:ring-orange-500"
            key={index}
            value={otp[index]}
            ref={inputRef.current[index]}
            onKeyDown={(e) => {
              handleKeyDown(e, index);
            }}
            onChange={(e) => {
              handleChange(e, index);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default OtpInput;
