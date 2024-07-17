
import { useForm } from "react-hook-form";

import axios from 'axios';
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', data);
      console.log(response.data); // Optionally, log response data
      
      toast.success("Signup Successful")
      // Handle success, e.g., show success message or redirect to login
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
        
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <Toaster></Toaster>
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500">Name is required.</p>}
        </div>
        <div>
          <label htmlFor="role" className="block font-semibold">Role:</label>
          <select name="role" id="" 
          {...register('role', { required: true })}
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500">
          <option disabled selected>Select Role</option>
            <option value="agent">Agent</option>
            <option value="user">User</option>
          </select>
          {errors.name && <p className="text-red-500">Name is required.</p>}
        </div>
        <div>
          <label htmlFor="number" className="block font-semibold">Mobile Number:</label>
          <input
            type="number"
            id="mobileNumber"
            {...register('mobileNumber', { required: true })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500">Name is required.</p>}
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500">Email is required.</p>}
          {errors.email && errors.email.message && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="pin" className="block font-semibold">5-digit PIN:</label>
          <input
            type="password"
            id="pin"
            {...register('pin', { required: true, minLength: 5, maxLength: 5 })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          {errors.pin && <p className="text-red-500">PIN must be exactly 5 characters long.</p>}
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Sign Up
        </button>
        <div className="mt-8">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    <strong>Sign In</strong>
                  </Link>{" "}
                </p>
              </div>
      </form>
    </div>
    );
};

export default SignUp;