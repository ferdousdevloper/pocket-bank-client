import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBlockUser = () => {
    const email = localStorage.getItem('email'); // Get email from local storage

    const { data, isLoading: isBlockLoading } = useQuery({
        queryKey: ['isBlock', email],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not authenticated');
            }
            const response = await axios.get(`https://mfs-backend-sigma.vercel.app/api/user/block/${email}`, {
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

    return [data?.block, isBlockLoading];
};

export default useBlockUser;