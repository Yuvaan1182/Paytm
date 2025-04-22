import InputBox from '../components/InputBox';
import PasswordInput from '../components/PasswordInput'; // Import reusable PasswordInput component
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import DonutChart from '../components/DonutChart';
import GlassCard from '../components/GlassCard';
import loginImage from '../assets/images/background.png';
import bubblePattern from '../assets/images/bubble_pattern.jpg';
import sandPattern from '../assets/images/sand.jpg';
import analysisImg from '../assets/images/analysis.jpg';
import BankCard from '../components/BankCard';

const webkitTextStroke = '-webkit-text-stroke: 1px black';

function SignIn() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { isAuthenticated } = useSelector(state => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = e => {
    const { name, value } = e.target;
    console.log('user', user);

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleClick = e => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert('Please fill in all required fields');
      return;
    }
    console.log(user);
    dispatch(loginUser(user));
  };

  return (
    <div
      className="flex h-full items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${analysisImg})` }}
    >
      <div className="shadow-4xl flex h-[90%] w-[80%] rounded-3xl border-10 border-white bg-white/10 bg-cover bg-center p-4 shadow-gray-500 backdrop-blur-sm">
        <div
          className="flex h-full flex-1 flex-col justify-between rounded-3xl bg-cover bg-center p-4"
          style={{ backgroundImage: `url(${analysisImg})` }}
        >
          <div
            className="flex w-fit items-baseline gap-2 rounded-3xl bg-white/10 p-4 text-6xl tracking-widest text-transparent uppercase backdrop-blur-sm"
            style={{ webkitTextStroke: '1px white' }}
          >
            <span className="rounded-2xl border-2 border-white px-4 py-2">V</span>
            <span>elora</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-3xl">
          <div className="flex w-2/3 flex-col gap-10 px-6 py-8">
            <div className="flex items-center justify-center text-6xl font-bold">
              {/* <div className="ml-auto w-fit">
                <div className="flex w-full items-baseline gap-4 text-white">
                  <span className="tracking-tighter">{"Don't have an account?"}</span>
                  <span className="rounded-2xl border-2 bg-gray-900 px-4 py-2">
                    <Link className="px-1" to={'/register'}>
                      Register
                    </Link>
                  </span>
                </div>
              </div> */}
            </div>
            <form className="flex w-full flex-col gap-20 py-2">
              <div className="flex flex-col items-baseline justify-between">
                <h1 className="text-6xl font-bold text-white capitalize">login</h1>
                <div className="from-bg-white to-bg-white/10 rounded-lg bg-gradient-to-br px-4 py-2 font-bold underline backdrop-blur-sm">
                  <Link to={'/register'}>Signup</Link>
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <InputBox
                  label=""
                  placeholder={'Email'}
                  type={'text'}
                  value={user.email}
                  name={'email'}
                  handleChange={handleChange}
                />
                <PasswordInput
                  label=""
                  placeholder={'Password'}
                  value={user.password}
                  name={'password'}
                  handleChange={handleChange}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="w-full py-2">
                  <Button
                    label={`Login`}
                    type="submit"
                    handleClick={handleClick}
                    color="gray"
                    disabled={false}
                  >
                    Login
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 py-2">
                  <div className="w-full border-t border-gray-300"></div>
                  <span className="rounded-lg border border-white bg-gray-500 px-2 py-1 text-white">
                    or
                  </span>
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
