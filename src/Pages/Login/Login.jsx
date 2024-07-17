import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      console.log(response.data);
      Swal.fire({
        title: "Login Successfully!",
        text: "Explore Your Dashboard!",
        icon: "success"
      }); // Optionally, log response data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      navigate('/dashboard');
      // Handle success, e.g., redirect to dashboard
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, e.g., display error message
    }
}
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-semibold">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500">Email is required.</p>}
        </div>
        <div>
          <label htmlFor="pin" className="block font-semibold">PIN:</label>
          <input
            type="password"
            id="pin"
            {...register('pin', { required: true })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          {errors.pin && <p className="text-red-500">PIN is required.</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </button>
        <div className="mt-8">
                <p>
                  New to here? Please{" "}
                  <Link to="/signUp" className="text-primary">
                    <strong>Sign Up</strong>
                  </Link>{" "}
                </p>
              </div>
      </form>
    </div>
    );
};

export default Login;