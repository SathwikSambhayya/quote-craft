import React from "react";
import { useState } from "react";
const DropDown = ({ values, onSelectDropDown,itemsPerPage }) => {
  const [dropDown, setOpenDropDown] = useState(false);
  return (
    <>
    <div className="flex flex-col relative items-center">
    {dropDown && (
        <ul className=" bg-white divide-y divide-gray-100 rounded-lg shadow min-w-14 left-0.5 -top-32 border-2 absolute border-slate-800 dark:border-gray-300 text-left ">
          
          {values.map((item) => (
            <li
              onClick={() => {
                onSelectDropDown(item);
              }}
                 className="text-lg hover:bg-blue-400 dark:hover:dark:bg-stone-900 dark:hover:text-white cursor-pointer p-1 "
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <button className=" border-2 rounded-lg p-2 border-slate-800 dark:border-gray-300 " onClick={() => setOpenDropDown((prev) => !prev)}>
        <div className="flex items-center">
        <p>{itemsPerPage || values[0]}</p>

        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        </div>
       
      </button>
    
      </div>
    </>
  );
};

export default DropDown;
