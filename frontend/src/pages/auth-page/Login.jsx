import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/form"; // adjust path as needed
import { loginFormControls } from "../../config/index";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { loginUser } from "@/Slices/auth-slice";
import { toast } from "sonner";
// adjust path

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        console.log(data?.payload?.message);
        toast.error(data?.payload?.message || "Login failed");
      }
    });
  };

  return (
    <div className="border-2 p-12 shadow-xl" style={{'borderRadius':'20px'}}>
      <div >
        <h1 className="text-3xl font-bold text-center">Log into Your Account</h1>
        <p className="text-center">
          Don't have an account{" "}
          <Link
            className="font-medium  text-primary hover:underline"
            to="/auth/register"
          >
            <u>Register</u>
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
