import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const fetchUsers = async (search, page) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`http://localhost:5000/api/users`, {
    params: { search, page },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const UserManagement = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['users', query, currentPage],
    queryFn: () => fetchUsers(query, currentPage),
    onError: (error) => {
      if (error.message === "No token found") {
        navigate("/login");
      } else {
        alert("Failed to fetch users");
      }
    }
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setQuery(search);
    setCurrentPage(1); // Reset to first page on new search
    refetch();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= data.totalPages) {
      setCurrentPage(page);
      refetch();
    }
  };

  const handleStatusActive = (user) => {
    axios.patch(`http://localhost:5000/api/users/status/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully user active");
      }
    });
  };

  const handleMakeBlock = (user) => {
    axios.patch(`http://localhost:5000/api/users/block/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully user Blocked");
      }
    });
  };

  const handleMakeActive = (user) => {
    axios.patch(`http://localhost:5000/api/users/active/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully user Active");
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center p-4 md:p-6 h-screen">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">User Management</h1>
      <div className="w-full max-w-lg mb-4">
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            className="input input-bordered bg-gradient-to-r from-violet-900 to-fuchsia-900 text-white flex-grow px-4 py-2 rounded-t-lg md:rounded-l-lg md:rounded-r-none focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-4 py-2 rounded-b-lg md:rounded-r-lg md:rounded-l-none md:rounded-b-none hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-16">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Block Status</th>
            </tr>
          </thead>
          <tbody className="text-center bg-gradient-to-r from-violet-900 to-fuchsia-900">
            {data.users.map((user, index) => (
              <tr key={user._id} className="h-12 border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {user.status === "active" ? (
                    <button className="bg-green-500 text-white px-4 py-1 rounded-lg">Active</button>
                  ) : (
                    <button
                      onClick={() => handleStatusActive(user)}
                      className="bg-orange-500 text-white px-4 py-1 rounded-lg"
                    >
                      Pending
                    </button>
                  )}
                </td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {user.blockStatus === "active" ? (
                    <button
                      onClick={() => handleMakeBlock(user)}
                      className="bg-green-500 text-white px-4 py-1 rounded-lg"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeActive(user)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default UserManagement;
