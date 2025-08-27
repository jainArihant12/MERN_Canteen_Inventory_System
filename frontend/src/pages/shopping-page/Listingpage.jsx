import ProductFilter from "@/components/shoppingComp/ProductFilter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import UserProductView from "@/components/shoppingComp/UserProductView";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredProduct,
  fetchProductDetails,
} from "@/Slices/shop/product-slice";
import { useSearchParams } from "react-router-dom";
import SelectedProductDetails from "@/components/shoppingComp/SelectedProductDetails";
import { addToCart, fetchCartItems } from "@/Slices/shop/cart-slice";
import { toast } from "sonner";

const Listingpage = () => {
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState("price_low_high");
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productList, productDetail } = useSelector(
    (state) => state.shopProducts
  );

  // Refs to avoid races between effects and programmatic URL updates
  const isInitializingRef = useRef(true); // skip URL updates during initial load
  const isUpdatingSearchParamsRef = useRef(false); // mark when we programmatically update the URL

  // Open product detail modal
  useEffect(() => {
    if (productDetail != null) setOpenProductDetail(true);
  }, [productDetail]);

  // 1) Initialize filters from sessionStorage once on mount
  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilter(storedFilters);
    // finished initialization — allow future URL updates from filters
    isInitializingRef.current = false;
  }, []);

  // Helper: build URLSearchParams from filters object
  const buildSearchParamsFromFilters = (filtersObj) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(filtersObj || {})) {
      if (Array.isArray(v) && v.length > 0) {
        params.set(k, v.join(","));
      }
    }
    return params;
  };

  // 2) When searchParams change (e.g., navbar click), merge the category safely.
  //    If the change was caused by our own programmatic setSearchParams, ignore it once.
  useEffect(() => {
    if (isUpdatingSearchParamsRef.current) {
      // ignore this run (reset flag) — prevents overwriting user toggles
      isUpdatingSearchParamsRef.current = false;
      return;
    }

    const category = searchParams.get("category");
    if (!category) return;

    setFilter((prev) => {
      // if category already matches, do nothing
      if (prev?.category?.[0] === category) return prev;
      const merged = { ...prev, category: [category] };
      sessionStorage.setItem("filters", JSON.stringify(merged));
      return merged;
    });

    setSort((prev) => prev || "price_low_high");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 3) When filters change (user toggles), update URL query string.
  //    Skip updating URL during initial load.
  useEffect(() => {
    if (isInitializingRef.current) return;

    // mark that we are about to update search params programmatically
    isUpdatingSearchParamsRef.current = true;

    const params = buildSearchParamsFromFilters(filters);
    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // 4) Fetch filtered products whenever filters or sort change
  useEffect(() => {
    dispatch(fetchFilteredProduct({ filtersParams: filters, sortParams: sort }));
  }, [dispatch, filters, sort]);

  // 5) Immutable toggle function for checkboxes
  const handleFilters = (section, optionId) => {
    setFilter((prev) => {
      const prevSection = prev[section] || [];
      const newSection = prevSection.includes(optionId)
        ? prevSection.filter((id) => id !== optionId)
        : [...prevSection, optionId];
      const newFilters = { ...prev, [section]: newSection };
      sessionStorage.setItem("filters", JSON.stringify(newFilters));
      return newFilters;
    });
  };

  const handleSort = (value) => setSort(value);

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          toast.success("Product added to cart");
          dispatch(fetchCartItems(user?.id));
        } else {
          toast.error("Failed to add product");
        }
      }
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <div className="w-full lg:w-1/4">
        <ProductFilter filters={filters} handleFilters={handleFilters} />
      </div>

      <div className="w-full lg:w-3/4 space-y-4">
        {/* Header: Title + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">All Products</h2>
            <span className="text-sm text-gray-600">
              {productList.length} <h4 className="inline">Products</h4>
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-48 p-2 border-gray-300 border-2 rounded-md bg-white shadow-md">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem
                    key={sortItem.id}
                    value={sortItem.id}
                    className="cursor-pointer px-3 py-1.5 rounded hover:bg-gray-200 text-sm text-gray-700
                               data-[state=checked]:bg-blue-100 data-[state=checked]:font-medium"
                  >
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productList.map((product) => (
            <UserProductView
              key={product._id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <SelectedProductDetails
        open={openProductDetail}
        setOpen={setOpenProductDetail}
        productDetail={productDetail}
      />
    </div>
  );
};

export default Listingpage;
