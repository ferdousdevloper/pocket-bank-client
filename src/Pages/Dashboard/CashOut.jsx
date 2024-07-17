import axios from 'axios';
import { useForm } from 'react-hook-form';
import useCurrentUser from './../../Hook/useCurrentUser';
import { useState } from 'react';
import Swal from 'sweetalert2';

const CashOut = () => {
  const { data: user, error: userError, isLoading: userLoading } = useCurrentUser();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    if (data.amount <= 0) {
      setMessage("Amount must be greater than 0");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cash-out', {
        agentEmail: data.agentEmail,
        amount: parseFloat(data.amount),
        pin: data.pin,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMessage(response.data.message);
      Swal.fire({
        title: "Cash-out successful",
        text: response.data.message,
        icon: "success"
      });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Failed to cash out");
      } else {
        setMessage("Failed to cash out");
      }
    }
  };

  if (userLoading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  if (userError) return <div className="flex justify-center items-center h-screen text-white">Error: {userError.message}</div>;

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Cash Out</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300">Agent Email</label>
            <input
              type="email"
              {...register('agentEmail', { required: true })}
              className="w-full px-4 py-2 mt-2 bg-gray-900 text-white rounded"
            />
            {errors.agentEmail && <p className="text-red-500">Agent email is required</p>}
          </div>
          <div>
            <label className="block text-gray-300">Amount</label>
            <input
              type="number"
              {...register('amount', { required: true, min: 0.01 })}
              className="w-full px-4 py-2 mt-2 bg-gray-900 text-white rounded"
            />
            {errors.amount && errors.amount.type === "required" && <p className="text-red-500">Amount is required</p>}
            {errors.amount && errors.amount.type === "min" && <p className="text-red-500">Amount must be greater than 0</p>}
          </div>
          <div>
            <label className="block text-gray-300">Pin</label>
            <input
              type="password"
              {...register('pin', { required: true })}
              className="w-full px-4 py-2 mt-2 bg-gray-900 text-white rounded"
            />
            {errors.pin && <p className="text-red-500">Pin is required</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Cash Out
          </button>
        </form>
        {message && <p className="mt-4 text-gray-300">{message}</p>}
      </div>
    </div>
  );
};

export default CashOut;
