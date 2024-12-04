import React, { useState } from "react";
import Button from "../atoms/Button.tsx";

export const ImageUpload = ({ uploadImage, previewImage ,uploadText}) => {
  return (
    <div className="flex flex-col gap-y-2 mt-2">
      <label>Upload an Image for the Quote:</label>
      <div className="relative w-64 h-64 md:w-96  border-4 dark:border-gray-200 border-dashed border-stone-500 rounded-lg overflow-hidden">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-full object-contain opacity-25"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center top-10 bg-gray-100">
            {/* <span className="text-gray-500">No image selected</span> */}
          </div>
        )}

        {/* Custom Upload Button */}
        <label className="cursor-pointer">
          {/* <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm h-12 items-center w-1/3 border-2 shadow-custom shadow-stone-900 border-stone-900  dark:border-zinc-200  dark:text-stone-900 text-stone-900 dark:border-stone-900">
            Choose Image
          </button> */}
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm h-12 w-1/3 border-2 shadow-custom shadow-stone-900 border-stone-900 text-stone-900  dark:border-white dark:hover:bg-stone-900 dark:hover:text-white hover:bg-stone-900 hover:text-white flex items-center justify-center transition-all duration-300 dark:bg-stone-900 dark:text-white">
          {uploadText}
          </button>
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif, image/jpg"
            onChange={uploadImage}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
