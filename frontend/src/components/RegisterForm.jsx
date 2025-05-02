import google from '../assets/images/google.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
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
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
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
        <div className="text-3xl font-extrabold tracking-wide text-gray-900">Create an account</div>
        <div className="max-w-80">Enter your details to sign up for this app.</div>
      </div>

      <div className="relative flex h-16 w-96 flex-col items-center justify-center">
        {currentFieldIndex !== 0 && (
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
            className="w-full rounded-lg border bg-white px-4 py-3 focus:outline-gray-400"
          />
        </motion.div>
        {currentFieldIndex !== fields.length - 1 && (
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
        disabled={!isFormValid}
        className={`flex w-96 items-center justify-center rounded-lg py-2 text-xl text-white transition-colors duration-300 ${
          isFormValid
            ? 'bg-gradient-to-r from-rose-700 to-gray-900 hover:from-gray-700 hover:to-rose-700'
            : 'cursor-not-allowed bg-gray-500'
        }`}
      >
        Register
      </button>
      <div className="my-5 flex w-2/3 items-center gap-4">
        <div className="h-px flex-1 bg-gray-300"></div>
        <div className="text-center text-gray-700">or continue with</div>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>
      <button
        type="button"
        onClick={() => login()}
        className="flex w-full items-center justify-center gap-4 rounded-lg bg-gray-200 px-4 py-2 font-serif tracking-wide shadow-lg hover:bg-gray-100"
      >
        <img className="w-5" src={google} alt="Google" /> Sign up with Google
      </button>
      <div className="flex w-96 items-center justify-center">
        <p className="rounded-md bg-white/10 px-4 py-2 font-bold text-blue-500 backdrop-blur-sm hover:underline">
          <Link to="/login">Sign in</Link>
        </p>
        <p className="cursor-pointer hover:underline"></p>
      </div>
      <p className="font-sans text-gray-800">
        By clicking continue, you agree to our <br />
        <span className="font-semibold">Terms of Service</span> and{' '}
        <span className="font-bold">Privacy Policy</span>
      </p>
    </form>
  );
};

export default RegisterForm;
