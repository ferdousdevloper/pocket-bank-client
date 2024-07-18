import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import bgImage from "../../../public/bg.png"; // Import your background image
import logo from "../../../public/logo.png"

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://mfs-backend-sigma.vercel.app/api/login', data);
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
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="max-w-md w-full bg-white p-6 shadow-md rounded-md bg-gradient-to-r  from-violet-800 to-fuchsia-800 text-white m-5">
            <div>
          <img src={logo} alt="" className="w-3/6 mx-auto py-6"/>
        </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <div>
                        <label htmlFor="email" className="block font-semibold">Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: true })}
                            placeholder='Your Email'
                            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500 bg-transparent"
                        />
                        {errors.email && <p className="text-red-500">Email is required.</p>}
                    </div>
                    <div>
                        <label htmlFor="pin" className="block font-semibold">PIN:</label>
                        <input
                            type="password"
                            id="pin"
                            {...register('pin', { required: true })}
                            placeholder='PIN'
                            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500 bg-transparent"
                        />
                        {errors.pin && <p className="text-red-500">PIN is required.</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 w-full text-white py-2 px-4 rounded-md transition-colors duration-300"
                    >
                        Login
                    </button>
                    <div className="mt-8 text-center">
                        <p>
                            New to here? Please{" "}
                            <Link to="/signUp" className="text-blue-500">
                                <strong>Sign Up</strong>
                            </Link>{" "}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
