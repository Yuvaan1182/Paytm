import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SingIn";
import Dashboard from "./routes/Dashboard";
import SendMoney from "./routes/SendMoney";

function App() {
  return (
    <div className="h-screen">
      <Router>
        <Routes>
          <Route path={"/register"} element={<SignUp />} />
          <Route path={"/login"} element={<SignIn />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/transfer"} element={<SendMoney />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
