import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const fetchUsers = async (search) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`http://localhost:5000/api/users?search=${search}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

const UserManagement = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const { data: users, error, isLoading, refetch } = useQuery({
    queryKey: ['users', query],
    queryFn: () => fetchUsers(query),
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
    refetch();
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
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">User Management</h1>
      <div className="w-full max-w-lg mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            className="input input-bordered bg-gray-800 text-white flex-grow px-4 py-2 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
      <table className="table-auto w-full   shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-600 h-16">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Block Status</th>
          </tr>
        </thead>
        <tbody className="text-center bg-gray-800">
          {users?.map((user, index) => (
            <tr key={user?._id} className="h-12 border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user?.name}</td>
              <td className="px-4 py-2">{user?.email}</td>
              <td className="px-4 py-2">
                {user?.status === "active" ? (
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
              <td className="px-4 py-2">{user?.role}</td>
              <td className="px-4 py-2">
                {user?.blockStatus === "active" ? (
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
  );
};

export default UserManagement;
