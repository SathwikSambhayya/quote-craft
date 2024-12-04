import React, { useState } from "react";
import { ImageUpload } from "../molecules/ImageUpload.tsx";
import { Header } from "../atoms/Header.tsx";
import Button from "../atoms/Button.tsx";
import { APP_ROUTES } from "../../CommonConstants.ts";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const CreateQuote = () => {
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({ quoteText: "", imageUrl: "" });
  const [errorFields, setErrorFields] = useState({
    quoteError: false,
    imgError: false,
  });
  const [uploading,setUploading]=useState(false)
  const navigate = useNavigate();
  const uploadImage = async (e) => {
    setUploading(true)
    const file = e.target.files[0];
  
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
          "https://crafto.app/crafto/v1.0/media/assignment/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
      
        toast("Image uploaded successfully! ", {
          position: "top-right",
        });
        setFormData((prev) => ({ ...prev, imageUrl: data[0].url }));
        setUploading(false)
      } catch (error) {
        toast("Image upload Failed! ", {
          position: "top-right",
        });
        console.log("ERROR", error);
      }
  };
  const validateFields = () => {
    if (!formData.quoteText) {
      setErrorFields((prev) => ({ ...prev, quoteError: true }));
      return false;
    }
    if (!formData.imageUrl) {
      setErrorFields((prev) => ({ ...prev, imgError: true }));
      return false;
    }
    return true;
  };
  const handleCreateQuote = async () => {
    const isValidated = validateFields();
    if (isValidated) {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetch(
          "https://assignment.stage.crafto.app/postQuote",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `${authToken}`,
            },
            body: JSON.stringify({
              text: formData.quoteText,
              mediaUrl: formData.imageUrl,
            }),
          }
        );

        if (response.ok) {
          toast("Quote created successfully!", {});
          navigate(APP_ROUTES.QUOTES_LIST);
        }
      } catch (error) {
        toast("Error in creation ", {});
        console.log("ERROR ON CREATING QUOTES");
      }
    }
  };

  return (
    <div className="w-screen  max-w-sm  md:max-w-5xl  p-6 mt-14  flex mx-auto flex-col gap-y-3 font-semibold h-screen dark:bg-stone-900">
      <>
        <Header text={"Create a Quote"} />
        <p>Upload image and and text for your quote</p>
      </>
      <div className="flex flex-col gap-y-2">
        <label>Enter Quote:</label>
        <textarea
          type="text"
          maxLength={"280"}
          rows={5}
          cols={10}
          value={formData.quoteText}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, quoteText: e.target.value }))
          }
          className="w-full md:w-1/2 p-2 h-full  border border-gray-300 rounded dark:border-gray-200 dark:bg-stone-900"
          placeholder="Enter your quote"
        />
      </div>
      {errorFields.quoteError && <div className="text-red-400">Quote field cannot be empty</div>}
      <div className="flex flex-col">
      <ImageUpload uploadImage={uploadImage} previewImage={formData.imageUrl} uploadText={uploading?'Uploading...':'Choose Image'} />
      {errorFields.imgError && (
        <div className="text-red-400">Please upload image to create</div>
      )}
      </div>
      <div className="flex gap-4 mt-6">
        <Button
          onClick={handleCreateQuote}
          disabled={loading}
          className="md:w-1/5 text-sm w-1/3 dark:bg-stone-900"
        >
          {loading ? "Creating..." : "Create"}
        </Button>
        <Button
          onClick={() => {
            navigate(APP_ROUTES.QUOTES_LIST);
          }}
          disabled={loading}
          className="md:w-1/5 text-sm w-1/3"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateQuote;
