import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const fetchTransactions = async ({ queryKey }) => {
    const [_key, { page }] = queryKey;
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const response = await axios.get(`http://localhost:5000/api/all-transactions?page=${page}&limit=3`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  };

const SystemMonitoring = () => {

    const [page, setPage] = useState(1);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['allTransactions', { page }],
    queryFn: fetchTransactions,
  });

  const handleNextPage = () => {
    if (page < data.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-white">Error: {error.message}</div>;
    return (
        <div className="flex items-center justify-center">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">System Monitoring</h1>
          <button onClick={refetch} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Refresh
          </button>
        </div>
        <div className="space-y-4">
          {data.transactions.map((transaction, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded text-white">
              <p><strong>From:</strong> {transaction.senderEmail}</p>
              <p><strong>To:</strong> {transaction.recipientEmail}</p>
              <p><strong>Amount:</strong> {transaction.amount}</p>
              <p><strong>Fee:</strong> {transaction.transactionFee}</p>
              <p><strong>Total:</strong> {transaction.totalAmount}</p>
              <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-white">Page {data.currentPage} of {data.totalPages}</span>
          <button
            onClick={handleNextPage}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
            disabled={page === data.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    );
};

export default SystemMonitoring;