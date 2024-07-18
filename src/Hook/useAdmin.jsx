// src/hooks/useAdmin.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAdmin = () => {
    const email = localStorage.getItem('email'); // Get email from local storage

    const { data, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', email],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not authenticated');
            }
            const response = await axios.get(`https://mfs-backend-sigma.vercel.app/api/user/admin/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    email,
                },
            });
            return response.data;
        },
        enabled: !!email, // Only run the query if email exists
    });

    return [data?.admin, isAdminLoading];
};

export default useAdmin;
