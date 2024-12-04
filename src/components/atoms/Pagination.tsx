import React, { useEffect, useState } from "react";
import DropDown from "../atoms/Dropdown.tsx";
import Button from "./Button.tsx";

export const Pagination = ({
  itemCount = 0,
  setOffset,
  offSet,
  setItemsPerPage,
}) => {
  const goToNextPage = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("offset", offSet + 1);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    setOffset((prev) => prev + 1);
  };

  const onSelectDropDown = (value) => {
    const params = new URLSearchParams(window.location.search);
    params.set("itemPerPage", value);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    setItemsPerPage(value);
  };

  const goToPreviousPage = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("offset", offSet - 1);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    if (offSet > 0) {
      setOffset((prev) => prev - 1);
    }
  };

  return (
    <div className="py-8 flex flex-row-reverse items-center gap-2">
      <DropDown values={[12, 22, 32]} onSelectDropDown={onSelectDropDown} />
      <Button className="text-xl px-2" onClick={() => goToNextPage()}>
        {">"}
      </Button>
      <Button
        className="text-xl px-2"
        onClick={() => goToPreviousPage()}
        disabled={offSet === 0}
      >
        {"<"}
      </Button>

      {/* <div
        style={{
          overflowX: "scroll",
          maxWidth: "15%",
          margin: 1,
          display: "flex",
        }}
      >
    
      </div> */}
    </div>
  );
};
