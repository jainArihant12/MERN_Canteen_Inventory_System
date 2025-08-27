import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '../../components/common/form'; // adjust path as needed
import { registerFormControls } from '../../config/index'
import { useDispatch } from 'react-redux';
import { registerUser } from '@/Slices/auth-slice';
import { toast } from 'sonner';

// adjust path

const initialState = {
  userName: '',
  email: '',
  password: '',
};


const Register = () => {

  const [formData, setFormData] = useState(initialState);
  console.log(formData)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      console.log(data)
      if (data?.payload?.success) {
        toast.success(data?.payload?.message)
        navigate("/auth/login")
      }
      else {
        console.log(data?.payload?.message)
        toast.error(data?.payload?.message || "Registration failed");
      }
    });

  }

  return (
    <div className="border-2 p-12 shadow-xl" style={{'borderRadius':'20px'}}>
      <div>
        <h1 className='text-3xl font-bold text-center '>Create New Account</h1>
        <p className='text-center'>Already have an account? <Link className='font-medium  text-primary hover:underline' to='/auth/login'><u>Login</u></Link></p>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText="Create Account"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>

  );
};

export default Register;
