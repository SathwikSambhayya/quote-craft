import React from "react";

export const BoxCard = ({
  text = "",
  imageUrl = "",
  userName = "",
  createdAt = "",
  id = "",
}) => {
  const date = new Date(createdAt).toLocaleDateString("en-US");
  return (
    <>
      <div
        // style={{
        //   border: "1px solid black",
        //   width: "30",
        //   margin: "10px",
        //   alignItems: "center",
        //   borderRadius: "2px",
        // }}
        className="border-3  shadow-stone-900 shadow-custom border-stone-900 p-3 dark:shadow-white dark:border-gray-200 dark:bg-stone-900"
      >
        <div className="relative md:w-full md:h-56 w-full">
          {imageUrl ? (
            <img
              className="-z-30 border-2 border-r-2 h-48 md:h-56 border-stone-900 dark:border-white w-full object-cover"
              src={imageUrl}
              alt="quote-image"
            />
          ) : (
            <div className="border-2 border-r-2 h-48 border-stone-900 dark:border-white md:h-56">
              <div className="text-lg absolute p-2  text-stone-900 text-ellipsis whitespace-normal  dark:text-white">
                Image not added
              </div>
            </div>
          )}
          <p className="text-sm   dark:border-white  absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2  overflow-hidden  max-w-full h-1/2 break-words text-stone-900 text-ellipsis whitespace-normal dark:text-white p-6">
            {text}
          </p>
        </div>
        {/* {item.name.firstname} */}
        {/* {item.email} */}
        {/* {item.phone} */}
        <div className="p-3 mt-2 flex flex-col gap-y-2">
        <p className="text-lg font-semibold">Name: <span className="font-normal">{userName}</span></p>
        <p className="text-lg font-semibold">Created at:<span className="font-normal"> {date}</span></p>
    
        </div>
      </div>
    </>
  );
};
