
import useCurrentUser from '../../Hook/useCurrentUser';

import { TbCoinTakaFilled } from 'react-icons/tb';

const BalanceInquiry = () => {
    const { data: user, error, isLoading } = useCurrentUser();
  
    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    return (
        <div className="flex items-center justify-center">
            {user && (
                <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full text-center">
                    <div className="flex justify-center mb-4">
                        <TbCoinTakaFilled className="text-green-400 text-6xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Balance Inquiry</h1>
                    <p className="text-xl text-gray-300">Your current balance is:</p>
                    <p className="text-2xl font-semibold text-white mt-2">{user.balance} TK</p>
                </div>
            )}
        </div>
    );
};

export default BalanceInquiry;