import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {
  const { loading, isAuthenticated } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      toast.success('User Created Successfully');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClick = e => {
    e.preventDefault();
    dispatch(registerUser(user));
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="bg-white-400 flex w-80 flex-col items-center rounded-sm p-4 shadow-lg">
        <Heading label="Sign Up" />
        <SubHeading label="Enter Your information to create an account" />
        <div className="w-full py-2">
          <InputBox
            label="First Name"
            placeholder="John"
            type="text"
            name="firstName"
            value={user.firstName}
            handleChange={handleChange}
          />
          <InputBox
            label="Last Name"
            placeholder="Doe"
            type="text"
            name="lastName"
            value={user.lastName}
            handleChange={handleChange}
          />
          <InputBox
            label="Email"
            placeholder="johndoe@example.com"
            type="text"
            name="email"
            value={user.email}
            handleChange={handleChange}
          />
          <InputBox
            label="Password"
            placeholder="******"
            type="password"
            name="password"
            value={user.password}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full py-2">
          <Button
            label={loading ? 'Loading...' : 'Register'}
            type="submit"
            color="blue"
            handleClick={handleClick}
            disabled={loading}
          />
        </div>
        <div className="w-full py-2 text-right">
          <BottomWarning warningText="Already have an account?" to="/login" label="Login" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
