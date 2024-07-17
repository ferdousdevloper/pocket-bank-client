import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const TransactionManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ cashInRequests: [], totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCashInRequests = async (page) => {
    try {
      const response = await axios.get('http://localhost:5000/api/cash-in-requests', {
        params: { page },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/manage-cash-in-request/${requestId}`, {
        action: 'approve'
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      Swal.fire({
        title: 'Success',
        text: 'Request approved successfully',
        icon: 'success'
      });
      fetchCashInRequests(currentPage);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to approve cash-in request'
      });
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/manage-cash-in-request/${requestId}`, {
        action: 'reject'
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      Swal.fire({
        title: 'Success',
        text: 'Request rejected successfully',
        icon: 'success'
      });
      fetchCashInRequests(currentPage);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to reject cash-in request'
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCashInRequests(currentPage);
  }, [currentPage]);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch cash-in requests'
    });
    return <div className="text-white">Error loading data</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-white mb-4">Agent Transactions</h1>
      <div className="grid grid-cols-1 gap-4">
        {data.cashInRequests.length === 0 && <p className="text-white">No cash-in requests found</p>}
        {data.cashInRequests.map(request => (
          <div key={request._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-white"><strong>User:</strong> {request.user}</p>
            <p className="text-white"><strong>Amount:</strong> ${request.amount}</p>
            <p className="text-white"><strong>Status:</strong> {request.status}</p>
            {request.status === 'pending' && (
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleApprove(request._id)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: data.totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-300 hover:bg-gray-600'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionManagement;
