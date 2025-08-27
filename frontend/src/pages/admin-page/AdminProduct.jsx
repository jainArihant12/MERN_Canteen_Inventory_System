import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormControls } from "@/config";
import AdminImageUpload from "@/components/adminComp/AdminImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "@/Slices/admin/product_slice";
import {
  fetchAllProduct,
  editAProduct,
  deleteProduct,
} from "@/Slices/admin/product_slice";
import { toast } from "sonner";
import AdminProductView from "@/components/adminComp/AdminProductView";

const intialState = {
  img: null,
  title: "",
  description: "",
  category: "",
  food: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProduct = () => {
  const [openProduct, setOpenProduct] = useState(false);
  const [formData, setFormData] = useState(intialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const { productList , isLoading } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();

  function handleDelete(deleteID) {
    dispatch(deleteProduct(deleteID)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
        toast.success("Product deleted successfully!");
      } else {
        toast.error("Failed to delete product.");
      }
    });
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (currentEditId !== null) {
      // Edit existing product
      dispatch(
        editAProduct({
          id: currentEditId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          setOpenProduct(false);
          setCurrentEditId(null);
          setFormData(intialState);
          toast.success("Product updated successfully!");
        }
      });
    } else {
      // Add new product
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadFileUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          setOpenProduct(false);
          setImageFile(null);
          setFormData(intialState);
          toast.success("Product Added Successfully");
        }
      });
    }
  };

  useEffect(() => {
    if (uploadFileUrl) {
      setFormData((prev) => ({
        ...prev,
        img: uploadFileUrl,
      }));
    }
  }, [uploadFileUrl]);

  useEffect(() => {
    dispatch(fetchAllProduct()); // example thunk action to fetch products
  }, [dispatch]);

  const isValidForm = () => {
    return Object.values(formData).every(
      (value) => value !== null && value !== "" && value !== undefined
    );
  };
  if(isLoading) return <div className='text-xl'>Loading Product...</div>
  return (
 <>
  <div className="mb-5 w-full flex flex-col">
    <button
      onClick={() => setOpenProduct(true)}
      className="self-start bg-black text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-900 hover:shadow-lg transition duration-300 ease-in-out mb-6"
    >
      Add New Product
    </button>

    {/* Flex container with wrap */}
    <div className="flex flex-wrap gap-6 justify-start">
      {productList?.length > 0 &&
        productList.map((product) => (
          <div
            key={product._id}
            className="flex-grow flex-shrink-0 basis-[280px]"
          >
            <AdminProductView
              product={product}
              setOpenProduct={setOpenProduct}
              setFormData={setFormData}
              setCurrentEditId={setCurrentEditId}
              handleDelete={handleDelete}
            />
          </div>
        ))}
    </div>
  </div>

  <Sheet
    open={openProduct}
    onOpenChange={(open) => {
      setOpenProduct(open)
      setCurrentEditId(null)
      setFormData(intialState)
    }}
  >
    <SheetContent side="right" className="bg-white overflow-auto">
      <SheetHeader>
        <SheetTitle className="text-xl">
          {currentEditId === null ? "Add Product" : "Edit Product"}
        </SheetTitle>
        <SheetDescription asChild>
          <div className="space-y-6">
            <AdminImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadFileUrl={uploadFileUrl}
              setUploadFileUrl={setUploadFileUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditId !== null}
            />
            <CommonForm
              formControls={addProductFormControls}
              buttonText={currentEditId === null ? "Add" : "Edit"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={HandleSubmit}
              isBtnDisable={!isValidForm()}
            />
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</>

  );
};

export default AdminProduct;
