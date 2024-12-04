import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../CommonConstants.ts";
import Button from "./Button.tsx";

const Error = () => {
 const navigate= useNavigate()
  return ReactDOM.createPortal(
    <>
      <div className="font-sourGummy">
      
          <div class="absolute transform -translate-x-2/4 -translate-y-2/4 bg-white p-6 rounded shadow-lg top-2/4 left-2/4 w-1/3">
            <h2 class="text-2xl font-bold">Oops!</h2>
            <p className="text-xl">Something went wrong</p>
            <Button className="text-sm mt-4" onClick={()=>navigate(APP_ROUTES.HOME)}>
              Go to login Page
            </Button>
         
        </div>
      </div>
    </>,
    document.getElementById("error-modal")
  );
};

export default Error;
