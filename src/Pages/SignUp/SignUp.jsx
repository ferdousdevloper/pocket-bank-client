import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import bgImage from "../../../public/bg.png";
import logo from "../../../public/logo.png"

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', data);
      console.log(response.data);
      toast.success("Signup Successful");
    } catch (error) {
      if (error.response && error.response.data) {
        setError('email', {
          type: 'manual',
          message: error.response.data.message,
        });
      } else {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md bg-gradient-to-r  from-violet-800 to-fuchsia-800 text-white">
        <Toaster />
        <div>
          <img src={logo} alt="" className="w-3/6 mx-auto py-6"/>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div>
            <label htmlFor="name" className="block font-semibold">Name:</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              placeholder="Your Name"
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500 bg-transparent"
            />
            {errors.name && <p className="text-red-500">Name is required.</p>}
          </div>
          <div>
            <label htmlFor="role" className="block font-semibold">Role:</label>
            <select
              name="role"
              id="role"
              {...register('role', { required: true })}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500 bg-transparent text-black"
            >
              <option value="" disabled>Select Role</option>
              <option value="agent">Agent</option>
              <option value="user">User</option>
            </select>
            {errors.role && <p className="text-red-500">Role is required.</p>}
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block font-semibold">Mobile Number:</label>
            <input
              type="tel"
              id="mobileNumber"
              {...register('mobileNumber', { required: true })}
              placeholder="Your Mobile Number"
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500 bg-transparent"
            />
            {errors.mobileNumber && <p className="text-red-500">Mobile Number is required.</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              placeholder="Your Email"
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500 bg-transparent"
            />
            {errors.email && <p className="text-red-500">Email is required.</p>}
          </div>
          <div>
            <label htmlFor="pin" className="block font-semibold">5-digit PIN:</label>
            <input
              type="password"
              id="pin"
              {...register('pin', { required: true, minLength: 5, maxLength: 5 })}
              placeholder="PIN"
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500 bg-transparent"
            />
            {errors.pin && <p className="text-red-500">PIN must be exactly 5 characters long.</p>}
          </div>
          
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 w-full text-white py-2 px-4 rounded-md transition-colors duration-300"
          >
            Sign Up
          </button>
          <div className="mt-8 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
