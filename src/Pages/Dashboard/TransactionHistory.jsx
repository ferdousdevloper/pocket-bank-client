import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import useCurrentUser from '../../Hook/useCurrentUser';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const TransactionHistory = () => {
  const { data: user, error, isLoading } = useCurrentUser();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`https://mfs-backend-sigma.vercel.app/api/transactions`, {
          params: { email: user.email, page: currentPage },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching transaction history', error);
      }
    };

    fetchTransactions();
  }, [user, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-white">Error: {error.message}</div>;

  return (
    <div className="flex items-center justify-center">
      <div className="shadow-lg rounded-lg p-8 w-full bg-gradient-to-r from-violet-800 to-fuchsia-800">
        <h1 className="text-3xl font-bold text-white mb-4">Transaction History</h1>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="p-4 rounded text-white flex items-center bg-gradient-to-r from-violet-900 to-fuchsia-900">
              {transaction.senderEmail === user.email ? (
                <FaArrowUp className="text-red-500 mr-6 text-3xl" />
              ) : (
                <FaArrowDown className="text-green-500 mr-6 text-3xl" />
              )}
              <div>
                <p><strong>{transaction.senderEmail === user.email ? 'Sent to' : 'Received from'}:</strong> {transaction.senderEmail === user.email ? transaction.recipientEmail : transaction.senderEmail}</p>
                <p><strong>Amount:</strong> {transaction.amount} TK</p>
                <p><strong>Fee:</strong> {transaction.transactionFee} TK</p>
                <p><strong>Total:</strong> {transaction.totalAmount} TK</p>
                <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === 1 ? 'bg-fuchsia-500 text-gray-300 cursor-not-allowed' : 'bg-fuchsia-500 text-gray-300 hover:bg-fuchsia-700'
            }`}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
          </button>

          <button
            className="px-3 py-1 mx-1 rounded bg-gradient-to-r from-violet-900 to-fuchsia-900 text-white"
          >
            {currentPage}
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === totalPages ? 'bg-fuchsia-500 text-gray-300 cursor-not-allowed' : 'bg-fuchsia-500 text-gray-300 hover:bg-fuchsia-700'
            }`}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
