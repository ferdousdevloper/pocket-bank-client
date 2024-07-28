
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from './PrivateRoute';
import Overview from "../Pages/Dashboard/Overview";
import TransactionManagement from "../Pages/Dashboard/TransactionManagement";
import BalanceInquiry from "../Pages/Dashboard/BalanceInquiry";
import TransactionHistory from "../Pages/Dashboard/TransactionHistory";
import UserManagement from "../Pages/Dashboard/UserManagement";
import SystemMonitoring from './../Pages/Dashboard/SystemMonitoring';
import SendMoney from "../Pages/Dashboard/SendMoney";
import CashOut from "../Pages/Dashboard/CashOut";
import CashIn from "../Pages/Dashboard/CashIn";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
  {
    path: "/",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <Overview></Overview>,
      },
      {
        path: "/dashboard/transactionManagement",
        element: <TransactionManagement></TransactionManagement>,
      },
      {
        path: "/dashboard/balanceInquiry",
        element: <BalanceInquiry></BalanceInquiry>,
      },
      {
        path: "/dashboard/transactionHistory",
        element: <TransactionHistory></TransactionHistory>,
      },
      {
        path: "/dashboard/userManagement",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/systemMonitoring",
        element: <SystemMonitoring></SystemMonitoring>,
      },
      {
        path: "/dashboard/sendMoney",
        element: <SendMoney></SendMoney>,
      },
      {
        path: "/dashboard/cashOut",
        element: <CashOut></CashOut>,
      },
      {
        path: "/dashboard/cashIn",
        element: <CashIn></CashIn>,
      },
    ]
  },
]);

export default Router;
