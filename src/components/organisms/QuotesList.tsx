import React, { useEffect } from "react";
import { BoxCard } from "../molecules/BoxCard.tsx";
import { useState } from "react";
import { RectangleCard } from "../molecules/RectangleCard.tsx";
import Button from "../atoms/Button.tsx";
import { APP_ROUTES } from "../../CommonConstants.ts";
import { useNavigate } from "react-router";
import { Pagination } from "../atoms/Pagination.tsx";
import { Loader } from "../atoms/Loader.tsx";

const QuotesList = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleView, setViewType] = useState(true);
  const params = new URLSearchParams(window.location.search);

  const [offSet, setOffset] = useState(parseInt(params.get("offset")) || 0);
  const [itemsPerPage, setItemsPerPage] = useState(
    parseInt(params.get("itemsPerPage")) || 10
  );
  const [noDataAvailable, setNoDataAvailable] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken") || "";
    try {
      const quotesData = await fetch(
        `https://assignment.stage.crafto.app/getQuotes?limit=12&offset=${
          offSet * itemsPerPage
        }&sortBy=date&order=desc`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const quotesInfo = await quotesData.json();
      if (quotesInfo.data.length > 0) {
        setQuoteList(quotesInfo?.data);
      } else {
        setNoDataAvailable(true);
      }
      setLoading(false);

      // setLoading(false)
    } catch (error) {
      navigate(APP_ROUTES.HOME);
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offSet, itemsPerPage]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mt-12 dark:bg-stone-900 w-screen min-h-full ">
      <div
        className={`mx-auto   ${
          toggleView ? `md:max-w-6xl` : `md:max-w-5xl`
        } z-50`}
      >
        <div className="flex justify-between items-center  md:left-auto fixed  p-3 bg-white dark:bg-stone-900 font-sourGummy font-semibold w-full  z-40">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl">Quotes</h1>

            <p className="text-sm md:text-xl">
              View the quotes added by our users
            </p>
          </div>
          <div
            className={`flex gap-3 absolute  left-80 ${
              !toggleView ? ` md:left-2/4` : `md:left-2/3`
            }`}
          >
            <Button
              onClick={() => setViewType((prev) => !prev)}
              className="hidden md:block "
            >
              {!toggleView ? "Grid View" : "List View"}
            </Button>

            <Button onClick={() => navigate(APP_ROUTES.CREATE_QUOTE)}>
              Create
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`w-screen h-screen   ${
          toggleView ? `md:max-w-6xl` : `md:max-w-5xl`
        } mx-auto flex flex-col  p-4 font-sourGummy `}
      >
        {toggleView ? (
          <div
            className={`grid grid-cols-1 gap-y-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 sm:gap-x-8 sm:gap-y-4 md:gap-6 md:mt-28 mt-16`}
          >
            {quoteList?.map((listItem) => (
              <BoxCard
                text={listItem.text}
                imageUrl={listItem.mediaUrl}
                createdAt={listItem.createdAt}
                userName={listItem.username}
                id={listItem.id}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-y-3 mt-16 md:mt-20">
              {quoteList?.map((listItem) => (
                <RectangleCard
                  text={listItem.text}
                  imageUrl={listItem.mediaUrl}
                  createdAt={listItem.createdAt}
                  userName={listItem.username}
                  id={listItem.id}
                />
              ))}
            </div>
          </>
        )}
        <Pagination
          itemCount={quoteList?.length}
          setOffset={setOffset}
          offSet={offSet}
          setItemsPerPage={setItemsPerPage}
        />
        {noDataAvailable && (
          <p className="text-4xl font-sourGummy font-semibold">
            No Data Available
          </p>
        )}
      </div>
    </div>
  );
};

export default QuotesList;
