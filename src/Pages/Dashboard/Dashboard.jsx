import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import useUser from "../../Hook/useUser";
import Swal from "sweetalert2";
import useBlockUser from "../../Hook/useBlockUser";
import usePending from "../../Hook/usePending";
import bgImage from "../../../public/bg.png"; // Import your background image here
import logo from "../../../public/logo.png"
const Dashboard = () => {
  const navigate = useNavigate();
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
      <div
        className="relative"
        style={{
          backgroundImage: `url(${bgImage})`, // Apply background image here
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dashboard side bar */}
        <div
          className={` ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[450px]"
          } w-32 md:w-64 min-h-full bg-gradient-to-r  from-violet-800 to-fuchsia-800  text-white   absolute   md:px-10 py-8  transform transition-transform ease-in-out duration-500 z-50`}
        >
          <div>
            <img src={logo} alt="" className="" />
          </div>
          <ul className="menu p-4 ">
            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
              <NavLink to="/dashboard">Overview</NavLink>
            </li>
            {isAdmin ? (
              <>
                <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                  <Link to="/dashboard/userManagement">User Management</Link>
                </li>
                <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                  <NavLink to="/dashboard/systemMonitoring">
                    System Monitoring
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {isPending ? (
                  <>
                    <p className="text-yellow-500 my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                      Your account is pending....
                    </p>
                    <p className="text-yellow-500 my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                      Your account will be active in few hours!!
                    </p>
                  </>
                ) : (
                  <>
                    {isBlock ? (
                      <>
                        <p className="text-red-600 my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                          Youre Blocked By Admin!!
                        </p>
                      </>
                    ) : (
                      <>
                        {isAgent ? (
                          <>
                            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                              <NavLink
                                to="/dashboard/transactionManagement"
                                activeClassName="text-blue-400"
                              >
                                Transaction Management
                              </NavLink>
                            </li>
                            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                              <NavLink
                                to="/dashboard/balanceInquiry"
                                activeClassName="text-blue-400"
                              >
                                Balance Inquiry
                              </NavLink>
                            </li>
                            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                              <NavLink
                                to="/dashboard/transactionHistory"
                                activeClassName="text-blue-400"
                              >
                                Transactions History
                              </NavLink>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                              <NavLink
                                to="/dashboard/sendMoney"
                                activeClassName="text-blue-400"
                              >
                                Send Money
                              </NavLink>
                            </li>
                            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                              <NavLink
                                to="/dashboard/cashOut"
                                activeClassName="text-blue-400"
                              >
                                Cash Out
                              </NavLink>
                            </li>
                            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                              <NavLink
                                to="/dashboard/cashIn"
                                activeClassName="text-blue-400"
                              >
                                Cash In
                              </NavLink>
                            </li>
                            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                              <NavLink
                                to="/dashboard/balanceInquiry"
                                activeClassName="text-blue-400"
                              >
                                Balance Inquiry
                              </NavLink>
                            </li>
                            <li className="my-4 bg-gradient-to-r p-2 rounded-lg  from-violet-900 to-fuchsia-900">
                              <NavLink
                                to="/dashboard/transactionHistory"
                                activeClassName="text-blue-400"
                              >
                                Transactions History
                              </NavLink>
                            </li>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 w-full text-white p-2 rounded"
            >
              Logout
            </button>
          </ul>
        </div>
        <label className="md:px-40 px-16 pt-10 btn btn-circle swap swap-rotate flex justify-end w-full text-2xl md:text-5xl items-center  text-white">
          {/* Hamburger menu */}
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
        <div className="p-8 w-full min-h-screen text-white">
          <div className="md:w-3/5 mx-auto">
            <Outlet />
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

