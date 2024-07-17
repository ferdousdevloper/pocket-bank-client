import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserByEmail = async (email) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`http://localhost:5000/api/users/email/${email}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

const useCurrentUser = () => {
  const email = localStorage.getItem("email");

  const queryResult = useQuery({
    queryKey: ['user', email],
    queryFn: () => fetchUserByEmail(email),
    onError: (error) => {
      if (error.message === "No token found") {
        // Handle token error
      } else {
        alert("Failed to fetch user data");
      }
    }
  });

  return queryResult;
};

export default useCurrentUser;
