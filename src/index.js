import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APP_ROUTES } from "./CommonConstants.ts";
import QuotesList from "./components/organisms/QuotesList.tsx";
import CreateQuote from "./components/organisms/CreateQuote.tsx";
import Error from "./components/atoms/Error.tsx";
import LoginPage from "./components/organisms/LoginPage.tsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/molecules/Navbar.tsx";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

// Layout Component
const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  useEffect(() => {
    if (darkMode) {
      // Add 'dark' class to <html> element
      document.documentElement.classList.add("dark");
    } else {
      // Remove 'dark' class from <html> element
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className={darkMode ? "dark" : ""}>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <main className="dark:text-white dark:bg-stone-900 w-screen h-screen">
        
        <Outlet />
        <ToastContainer
          theme={darkMode ? "dark" : "light"}
          position="top-bottom"
          hideProgressBar={true}
          autoClose={5000}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
    </div>
  );
};

// Routes
const AppRoute = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        element: <LoginPage />,
        path: APP_ROUTES.HOME,
      },
      {
        element: <CreateQuote />,
        path: APP_ROUTES.CREATE_QUOTE,
      },
      {
        element: <QuotesList />,
        path: APP_ROUTES.QUOTES_LIST,
      },
    ],
  },
]);

// Render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRoute} />);
