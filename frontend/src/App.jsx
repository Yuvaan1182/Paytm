import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './routes/SignUp';
import SignIn from './routes/SingIn';
import Dashboard from './routes/Dashboard';
import SendMoney from './routes/SendMoney';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import Analytics from './routes/Analytics';
import AppLayout from './routes/AppLayout';
import ThemeManager from './components/ThemeManager';
import Transactions from './routes/Transactions.';
import { motion } from 'framer-motion';
import LoginView from './components/LoginView';

function App() {
  return (
    <div className="relative h-screen font-mono dark:bg-slate-950">
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
        <ThemeManager />
        {/* ThemeManager is used to manage the theme */}
        <Router>
          <Routes>
            <Route path={'/register'} element={<SignUp />} />
            <Route path={'/login'} element={<LoginView />} />

            {/* Layout route */}
            <Route path="/" element={<AppLayout />}>
              {/* Pages will render next to the sidebar */}
              <Route index element={<SendMoney />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transfer" element={<SendMoney />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="transaction" element={<Transactions />} />
              <Route path="settings" element={<SendMoney />} />
            </Route>
          </Routes>
        </Router>
      </ErrorBoundary>

      {/* <motion.div animate={{rotate: 180, transition: {
        duration: 2
      }}} className="absolute -top-1/6 left-1/2 w-100 h-100 p-6 z-1 rounded-full shadow-lg backdrop-blur-md bg-white/30 border border-white/20"></motion.div> */}
    </div>
  );
}

export default App;
