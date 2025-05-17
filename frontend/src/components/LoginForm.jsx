import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import google from '../assets/images/google.png';
import { userLogin } from '../features/thunks/thunks';

const LoginForm = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  const login = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  const fields = [
    { name: 'email', placeholder: 'email@domain.com', type: 'text' },
    { name: 'password', placeholder: '******', type: 'password' },
  ];

  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('User Login Successful');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleNext = () => {
    if (currentFieldIndex < fields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };

  const handleLogin = e => {
    e.preventDefault();
    dispatch(userLogin(user));
  };

  const variants = {
    enter: direction => ({
      x: direction === 'left' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: direction => ({
      x: direction === 'left' ? -100 : 100,
      opacity: 0,
    }),
  };

  const isFormValid = fields.every(field => user[field.name]?.trim() !== '');
  return (
    <form className="flex w-96 flex-col items-center gap-4">
      <div className="text-center">
        <div className="text-3xl font-bold tracking-wide text-gray-900">Login </div>
        <div className="max-w-80">Enter your email to login to this app.</div>
      </div>
      <div className="relative flex h-16 w-96 flex-col items-center justify-center">
        {currentFieldIndex === 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-14 rounded-full bg-gray-300 p-2 transition-colors duration-300 hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>
        )}
        <motion.div
          key={currentFieldIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          custom={currentFieldIndex === 0 ? 'right' : 'left'}
          transition={{ duration: 0.3 }}
          className="absolute w-full"
        >
          <input
            type={fields[currentFieldIndex].type}
            name={fields[currentFieldIndex].name}
            placeholder={fields[currentFieldIndex].placeholder}
            value={user[fields[currentFieldIndex].name] || ''}
            onChange={handleChange}
            className="w-full rounded-lg border bg-white px-4 py-3 focus:outline-gray-400"
          />
        </motion.div>
        {currentFieldIndex === 0 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-14 rounded-full bg-gray-300 p-2 transition-colors duration-300 hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        )}
      </div>
      <button
        onClick={handleLogin}
        disabled={!isFormValid || isAuthenticated} // Disable if already authenticated
        className={`flex w-96 items-center justify-center rounded-lg py-2 text-xl text-white transition-colors duration-300 ${
          isFormValid
            ? 'bg-gradient-to-r from-rose-700 to-gray-900 hover:from-gray-700 hover:to-rose-700'
            : 'cursor-not-allowed bg-gray-500'
        }`}
      >
        Login
      </button>
      <div className="my-5 flex w-2/3 items-center gap-4">
        <div className="h-px flex-1 bg-gray-300"></div>
        <div className="text-center text-gray-700">or continue with</div>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>
      <button
        onClick={() => login()}
        type="button"
        className="flex items-center justify-center gap-4 rounded-lg bg-gray-200 p-4 font-serif tracking-wide shadow-lg hover:bg-gray-100"
      >
        <img className="w-5" src={google} alt="Google" />
      </button>
      <div className="flex w-full items-center justify-between">
        <p className="rounded-md bg-white/10 py-2 font-semibold text-blue-500 backdrop-blur-sm hover:underline">
          <Link to="/register">Register</Link>
        </p>
        <p className="cursor-pointer hover:underline">Forgot Password?</p>
      </div>
      <p className="font-sans text-sm text-gray-800">
        By clicking continue, you agree to our <br />
        <span className="font-semibold">Terms of Service</span> and{' '}
        <span className="font-bold">Privacy Policy</span>
      </p>
    </form>
  );
};

export default LoginForm;
