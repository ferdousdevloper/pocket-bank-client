import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const usePending = () => {
    const email = localStorage.getItem('email'); // Get email from local storage

    const { data, isLoading: isPendingLoading } = useQuery({
        queryKey: ['isPending', email],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not authenticated');
            }
            const response = await axios.get(`http://localhost:5000/api/user/status/${email}`, {
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

    return [data?.pending, isPendingLoading];
};

export default usePending;