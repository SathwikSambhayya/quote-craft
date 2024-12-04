import React from "react";

export const RectangleCard = ({
  text = "",
  imageUrl = "",
  userName = "",
  createdAt = "",
  id = "",
}) => {
  const date = new Date(createdAt).toLocaleDateString("en-US");
  return (
    <div className="flex flex-col md:flex-row  shadow-stone-900 shadow-custom border-3 border-stone-900 p-3 gap-2 gap-x-3  dark:shadow-white dark:border-gray-200 dark:bg-stone-900">
      <div className="relative md:w-64 md:h-48 w-full">
        {imageUrl ? (
          <img
            className="-z-30 border-2 border-r-2 h-48 border-stone-900 dark:border-white w-full object-cover"
            src={imageUrl}
            alt="quote-image"
          />
        ) : (
          <div className="border-2 border-r-2 h-48 border-stone-900 dark:border-white">
          <div className="text-lg absolute p-2  text-stone-900 text-ellipsis whitespace-normal  dark:text-white">
            Image not added
          </div>
        </div>
        )}

      
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-lg max-w-2xl font-semibold">Quote: <span className="font-normal">{text} </span>.</p>
        <p className="text-lg font-semibold">Name: <span className="font-normal">{userName}</span></p>
        <p className="text-lg font-semibold">Created at:<span className="font-normal"> {date}</span></p>
      </div>
    </div>
  );
};
