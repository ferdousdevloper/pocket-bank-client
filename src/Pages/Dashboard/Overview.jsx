
import useCurrentUser from "../../Hook/useCurrentUser";


const Overview = () => {
    const { data: user, error, isLoading } = useCurrentUser();
  
    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  return (
    <div className="flex  justify-center">
      {user && (
        <div className="shadow-lg rounded-lg px-8 py-20 bg-gray-800 w-full">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="">{user.email}</p>
          </div>
          <hr />
          <div className="my-10 grid grid-cols-3 text-center">
            <p className="font-semibold text-3xl">
              <span className="">Balance:</span> {user.balance} TK
            </p>
            <p className="font-semibold text-3xl">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
            <p className="font-semibold text-3xl">
              <span className="font-semibold">Status:</span> {user.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
