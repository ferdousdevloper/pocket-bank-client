import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchTransactions = async ({ queryKey }) => {
  const [_key, { page }] = queryKey;
  const token = localStorage.getItem('token');
  const response = await axios.get(`https://mfs-backend-sigma.vercel.app/api/all-transactions?page=${page}&limit=3`, {
    headers: {
      Authorization: `Bearer ${token}`,
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
      <div className="shadow-lg rounded-lg p-4 w-full bg-gradient-to-r from-violet-800 to-fuchsia-800">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-3xl font-bold text-white">System Monitoring</h1>
          <button onClick={refetch} className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-violet-700 hover:to-fuchsia-700 transition duration-300">
            Refresh
          </button>
        </div>
        <div className="space-y-4">
          {data.transactions.map((transaction, index) => (
            <div key={index} className="p-2 sm:p-4 rounded text-white bg-gradient-to-r from-violet-900 to-fuchsia-900">
              <p><strong>From:</strong> {transaction.senderEmail}</p>
              <p><strong>To:</strong> {transaction.recipientEmail}</p>
              <p><strong>Amount:</strong> {transaction.amount} TK</p>
              <p><strong>Fee:</strong> {transaction.transactionFee} TK</p>
              <p><strong>Total:</strong> {transaction.totalAmount} TK</p>
              <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-4 rounded mb-2 sm:mb-0 hover:bg-gradient-to-r hover:from-violet-700 hover:to-fuchsia-700 transition duration-300"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-white mb-2 sm:mb-0">Page {data.currentPage} of {data.totalPages}</span>
          <button
            onClick={handleNextPage}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-violet-700 hover:to-fuchsia-700 transition duration-300"
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
