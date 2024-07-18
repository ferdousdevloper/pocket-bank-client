import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const TransactionManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ cashInRequests: [], totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCashInRequests = async (page) => {
    try {
      const response = await axios.get('https://mfs-backend-sigma.vercel.app/api/cash-in-requests', {
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
      await axios.put(`https://mfs-backend-sigma.vercel.app/api/manage-cash-in-request/${requestId}`, {
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
      await axios.put(`https://mfs-backend-sigma.vercel.app/api/manage-cash-in-request/${requestId}`, {
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
    if (page >= 1 && page <= data.totalPages) {
      setCurrentPage(page);
    }
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
      <div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-violet-800 to-fuchsia-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-white mb-4">Agent Transactions</h1>
        {data.cashInRequests.length === 0 && <p className="text-white">No cash-in requests found</p>}
        {data.cashInRequests.map(request => (
          <div key={request._id} className="p-4 rounded-lg shadow-lg bg-gradient-to-r from-violet-900 to-fuchsia-900">
            <p className="text-white"><strong>User:</strong> {request.user}</p>
            <p className="text-white"><strong>Amount:</strong> {request.amount} TK</p>
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

        <button className="px-3 py-1 mx-1 rounded bg-gradient-to-r from-violet-900 to-fuchsia-900 text-white">
          {currentPage}
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === data.totalPages ? 'bg-fuchsia-500 text-gray-300 cursor-not-allowed' : 'bg-fuchsia-500 text-gray-300 hover:bg-fuchsia-700'
          }`}
          disabled={currentPage === data.totalPages}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TransactionManagement;
