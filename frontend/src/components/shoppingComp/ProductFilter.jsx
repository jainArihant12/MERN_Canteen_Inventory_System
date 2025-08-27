import { filterOptions } from "@/config";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";
import React from "react";

const ProductFilter = ({ filters, handleFilters }) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
      </div>

      <div className="space-y-4">
        {Object.keys(filterOptions).map((section, index) => (
          <div key={index} className="space-y-2">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                {section}
              </h3>
              <div className="space-y-1">
                {filterOptions[section].map((option, idx) => (
                  <Label
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                  >
                    <Checkbox.Root
                      checked={filters?.[section]?.includes(option.id) || false}
                      onCheckedChange={() => handleFilters(section, option.id)}
                      className="h-5 w-5 border-2 border-gray-700 rounded flex items-center justify-center
                        bg-white transition data-[state=checked]:bg-black data-[state=checked]:border-black"
                    >
                      <Checkbox.Indicator>
                        <Check className="w-3 h-3 text-white" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
