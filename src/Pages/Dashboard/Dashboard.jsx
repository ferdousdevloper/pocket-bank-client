
import {  useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import useUser from "../../Hook/useUser";
import Swal from "sweetalert2";
import useBlockUser from "../../Hook/useBlockUser";
import usePending from "../../Hook/usePending";

const Dashboard = () => {
  const navigate = useNavigate();
  // const [users, setUsers] = useState([]);
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isAgent, isAgentLoading] = useUser();
  const [isBlock, isBlockLoading] = useBlockUser();
  const [isPending, isPendingLoading] = usePending();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isAdminLoading) return <div>Loading...</div>;
  if (isAdmin === undefined)
    return <div>Error: Unable to determine admin status</div>;

  if (isAgentLoading) return <div>Loading...</div>;
  if (isAgent === undefined)
    return <div>Error: Unable to determine agent status</div>;

  if (isBlockLoading) return <div>Loading...</div>;
  if (isBlock === undefined)
    return <div>Error: Unable to determine block status</div>;

  if (isPendingLoading) return <div>Loading...</div>;
  if (isPending === undefined)
    return <div>Error: Unable to determine Pending status</div>;

  console.log(isAdmin);
  console.log(isAgent);
  console.log(isBlock);
  console.log(isPending);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("email"); // Remove email from local storage
    Swal.fire({
      title: "Logout Successfully!",
      text: "Thank you",
      icon: "success",
    });
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <div className="relative">
        {/* dashboard side bar */}
        <div
          className={` ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[450px]"
          } w-32 md:w-64 min-h-screen bg-gradient-to-r from-violet-800 to-fuchsia-800 text-white   absolute   md:px-10 py-8  transform transition-transform ease-in-out duration-500 z-50`}
        >
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard">Overview</NavLink>
            </li>
            {isAdmin ? (
              <>
                <li>
                  <Link to="/dashboard/userManagement">User Management</Link>
                </li>
                <li>
                  <NavLink to="/dashboard/systemMonitoring">
                    System Monitoring
                  </NavLink>
                </li>
              </>
            ) : (
              <>{isPending ? (<>
                <p className="text-yellow-500">Youre account is pending....</p>
                <p className="text-yellow-500">Youre account will be active in few hours!!</p>
              </>):(<>
                {isBlock ? (
                  <>
                    <p className="text-red-600">Youre Blocked By Admin!!</p>
                  </>
                ) : (
                  <>
                    <>
                      {isAgent ? (
                        <>
                          <li>
                            <NavLink to="/dashboard/transactionManagement">
                              Transaction Management
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/dashboard/balanceInquiry">
                              Balance Inquiry
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/dashboard/transactionHistory">
                              Transactions History
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <NavLink to="/dashboard/sendMoney">
                              Send Money
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/dashboard/cashOut">Cash Out</NavLink>
                          </li>
                          <li>
                            <NavLink to="/dashboard/cashIn">Cash In</NavLink>
                          </li>
                          <li>
                            <NavLink to="/dashboard/balanceInquiry">
                              Balance Inquiry
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/dashboard/transactionHistory">
                              Transactions History
                            </NavLink>
                          </li>
                        </>
                      )}
                    </>
                  </>
                )}
              </>)}</>
              
            )}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white p-2 rounded"
            >
              Logout
            </button>
          </ul>
        </div>
        <label className="md:px-40 px-16 pt-10 btn btn-circle swap swap-rotate flex justify-end w-full text-2xl md:text-5xl items-center bg-gray-700 text-white">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" hidden onClick={toggleSidebar} />
          {sidebarOpen ? (
            <>
              <IoMdClose />
            </>
          ) : (
            <>
              <GiHamburgerMenu />
            </>
          )}
        </label>
        {/* dashboard content */}
        <div className="p-8 w-full min-h-screen bg-gray-700  text-white">
          <div className="w-3/5 mx-auto">
            <Outlet />
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
