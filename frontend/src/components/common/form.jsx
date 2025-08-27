
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CommonForm = ({ formControls, buttonText, formData, setFormData, onSubmit ,isBtnDisable}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-6">

      {formControls.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="font-medium">{field.label}</label>

          {field.componentType === "input" && (
            <Input
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required ?? true}
              style={{'borderRadius':'5px'}}
              className="focus:border-black border-gray-400 focus:border-2 focus:shadow-md transition"
            />
          )}

          {field.componentType === "textarea" && (
            <Textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              required={field.required ?? false}
              style={{'borderRadius':'5px'}}
            />
          )}

          {field.componentType === "select" && (
            <Select
              value={formData[field.name] || ""}
              onValueChange={(value) =>
                setFormData(prev => ({ ...prev, [field.name]: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent className='bg-white' style={{'border-radius':'5px'}}>
                <SelectGroup>
                  <SelectLabel>{field.label}</SelectLabel>
                  {field.options.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
      ))}
      
      <Button
        type="submit"
        className="w-full  text-white bg-black hover:bg-gray-900 hover:opacity-90" disabled={isBtnDisable}
       style={{'borderRadius':'10px'}}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;
