import React from "react";

const Button = ({ children, className = "", onClick, text, disabled }) => {
  return (
    <>
      <button
        className={`border-3 dark:shadow-white md:px-5 md:py-3 hover:text-white dark:hover:text-stone-900
    shadow-stone-900 shadow-custom dark:border-gray-200 border-stone-900 hover:bg-stone-900 dark:bg-stone-900 dark:hover:bg-white 
    ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        onClick={onClick}
        type="submit"
        disabled={disabled}
      >
        {children}
        {text}
      </button>
    </>
  );
};

export default Button;
