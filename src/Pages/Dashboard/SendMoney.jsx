import axios from 'axios';
import { useForm } from 'react-hook-form';
import useCurrentUser from './../../Hook/useCurrentUser';
import { useState } from 'react';
import Swal from 'sweetalert2';

const SendMoney = () => {
  const { data: user, error, isLoading } = useCurrentUser();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    if (data.amount < 50) {
      setMessage("Transaction must be at least 50 Taka");
      
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/send-money', {
        senderEmail: user.email,
        recipientEmail: data.recipientEmail,
        amount: parseFloat(data.amount)
      });

      setMessage(response.data.message);
      Swal.fire({
        title: "Transaction successful",
        text: "Happy Transaction",
        icon: "success"
      });
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-white">Error: {error.message}</div>;
    return (
      <div className="flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Send Money</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300">Recipient Email</label>
            <input
              type="email"
              {...register('recipientEmail', { required: true })}
              className="w-full px-4 py-2 mt-2 bg-gray-900 text-white rounded"
            />
            {errors.recipientEmail && <p className="text-red-500">Recipient email is required</p>}
          </div>
          <div>
            <label className="block text-gray-300">Amount</label>
            <input
              type="number"
              {...register('amount', { required: true, min: 50 })}
              className="w-full px-4 py-2 mt-2 bg-gray-900 text-white rounded"
            />
            {errors.amount && errors.amount.type === "required" && <p className="text-red-500">Amount is required</p>}
            {errors.amount && errors.amount.type === "min" && <p className="text-red-500">Transaction must be at least 50 Taka</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Send Money
          </button>
        </form>
        {message && <p className="mt-4 text-gray-300">{message}</p>}
      </div>
    </div>
    );
};

export default SendMoney;