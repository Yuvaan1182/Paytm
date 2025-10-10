import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import google from '../assets/images/google.png';
import { userRegistration } from '../features/thunks/thunks';

const RegisterForm = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  const fields = [
    { name: 'firstName', placeholder: 'First Name', type: 'text' },
    { name: 'lastName', placeholder: 'Last Name', type: 'text' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'password', placeholder: 'Password', type: 'password' },
  ];

  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('User Registration Successfully');
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
    dispatch(userRegistration(user));
  };

  const login = () => {
    const baseUrl = import.meta.env.VITE_BASE_DEV_URL || 'http://localhost:3000';
    window.location.href = `${baseUrl}/api/v1/auth/google`;
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
    <form className="flex flex-col items-center gap-4 w-96">
      <div className="text-center">
        <div className="text-3xl font-extrabold tracking-wide text-gray-900">Create an account</div>
        <div className="max-w-80">Enter your details to sign up for this app.</div>
      </div>

      <div className="relative flex flex-col items-center justify-center h-16 w-96">
        {currentFieldIndex !== 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute p-2 transition-colors duration-300 bg-gray-300 rounded-full -left-14 hover:bg-gray-100"
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
          custom={currentFieldIndex === fields.length - 1 ? 'left' : 'right'}
          transition={{ duration: 0.3 }}
          className="absolute w-full"
        >
          <input
            type={fields[currentFieldIndex].type}
            name={fields[currentFieldIndex].name}
            placeholder={fields[currentFieldIndex].placeholder}
            value={user[fields[currentFieldIndex].name] || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-gray-400"
          />
        </motion.div>
        {currentFieldIndex !== fields.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute p-2 transition-colors duration-300 bg-gray-300 rounded-full -right-14 hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      <button
        onClick={handleLogin}
        disabled={!isFormValid}
        className={`flex w-96 items-center justify-center rounded-lg py-2 text-xl text-white transition-colors duration-300 ${
          isFormValid
            ? 'bg-gradient-to-r from-rose-700 to-gray-900 hover:from-gray-700 hover:to-rose-700'
            : 'cursor-not-allowed bg-gray-500'
        }`}
      >
        Register
      </button>
      <div className="flex items-center w-2/3 gap-4 my-5">
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className="text-center text-gray-700">or continue with</div>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      <button
        type="button"
        onClick={() => login()}
        className="flex items-center justify-center gap-4 p-4 font-serif tracking-wide bg-gray-200 rounded-lg shadow-lg hover:bg-gray-100"
      >
        <img className="w-5" src={google} alt="Google" />
      </button>
      <div className="flex justify-start w-full">
        <p className="py-2 font-semibold text-blue-500 rounded-md hover:underline">
          <Link to="/login">Login</Link>
        </p>
        <p className="cursor-pointer hover:underline"></p>
      </div>
      <p className="font-sans text-sm text-gray-800">
        By clicking continue, you agree to our <br />
        <span className="font-semibold">Terms of Service</span> and{' '}
        <span className="font-bold">Privacy Policy</span>
      </p>
    </form>
  );
};

export default RegisterForm;
