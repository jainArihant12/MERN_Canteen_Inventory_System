import React, { useEffect, useRef } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { CloudUpload } from "lucide-react";
import { FileImage } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const AdminImageUpload = ({
  imageFile,
  setImageFile,
  uploadFileUrl,
  setUploadFileUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode
}) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const selectedImg = e.target.files?.[0];
    if (selectedImg) setImageFile(selectedImg);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropFile = e.target.files?.[0];
    if (dropFile) setImageFile(dropFile);
  };
  const handleRemove = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile);

      const response = await axios.post(
        "http://localhost:5000/api/admin/product/upload-image",
        data
      );
      const result = response?.data?.result;

      if (response?.data?.success && result?.secure_url) {
        setUploadFileUrl(result.secure_url);
      } else {
        console.error("Image Upload Error:", response?.data);
        alert("Image upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Image Upload Exception:", err);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile != null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <>
      <div>
        <Label className="text-md mb-1 font-semibold block">Upload Image</Label>
        <div  onDragOver={handleDragOver} onDrop={handleDrop}>
          <Input
            type="file"
            id="image-upload"
            className="hidden"
            ref={inputRef}
            onChange={handleChange}
            disabled={isEditMode}
          ></Input>
        </div>
      </div>
      {!imageFile ? (
        <Label
          htmlFor="image-upload"
          style={{ borderRadius: "10px" }}
          className={` ${isEditMode ? 'cursor-not-allowed opacity-50 ' : ''} flex flex-col items-center justify-center cursor-pointer h-40 border-2 border-black border-dashed`}
        >
          <CloudUpload />
          <span>Drag & Drop or click to upload</span>
        </Label>
      ) : imageLoadingState ? (
        <Skeleton className="bg-gray-300 h-30" />
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <FileImage />
          </div>
          <div className="text-sm">{imageFile.name}</div>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
            <span>Remove File</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default AdminImageUpload;
