import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SingIn";
import Dashboard from "./routes/Dashboard";
import SendMoney from "./routes/SendMoney";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <div className="h-screen">
      <ErrorBoundary>
        <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
              />
        <Router>
          <Routes>
            <Route path={"/register"} element={<SignUp />} />
            <Route path={"/login"} element={<SignIn />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/transfer"} element={<SendMoney />} />
            <Route path={"*"} element={<SignIn />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
