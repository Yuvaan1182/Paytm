import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthView from './components/AuthView';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeManager from './components/ThemeManager';
import { loginWithToken } from './features/auth/authSlice';
import Analytics from './routes/Analytics';
import AppLayout from './routes/AppLayout';
import Dashboard from './routes/Dashboard';
import Payments from './routes/Payments';
import SendMoney from './routes/SendMoney';
import Transactions from './routes/Transactions.';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get('token');
    // const failed = params.get('failed');

    if (token) {
      dispatch(loginWithToken(token));
      window.history.replaceState({}, document.title, '/'); // Remove token from URL
    }
  }, [dispatch]);

  return (
    <div className="relative h-screen font-sans dark:bg-slate-950">
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
            <Route path={'/register'} element={<AuthView />} />
            <Route path={'/login'} element={<AuthView />} />

            {/* Layout route */}
            <Route path="/" element={<AppLayout />}>
              {/* Pages will render next to the sidebar */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transfer" element={<Payments />} />
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
