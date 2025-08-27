// HomeSlider.jsx

import { Card, CardContent } from "@/components/ui/card";
import banner from "@/assets/banner.jpg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function HomeSlider() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/shop/listing");
  };
  return (
    <div className="w-full min-w-lg mx-auto relative">
      <Card className="shadow-xl overflow-hidden">
        <CardContent className="p-0 relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
          <div className="relative h-full w-full">
            <img
              src={banner}
              alt="Banner"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>

          <div className="absolute inset-0 flex items-center px-4 sm:px-8 md:px-12 lg:px-20 text-white">
            <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-1/2">
              <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                Explore Our Latest Meal
              </h2>
              <Button
                onClick={handleNavigate}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-black rounded-xl hover:bg-blue-700 transition drop-shadow-lg text-sm sm:text-base"
              >
                Go to Menu
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
