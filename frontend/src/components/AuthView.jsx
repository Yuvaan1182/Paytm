import { useLocation } from 'react-router-dom';
import loginBG from '../assets/images/Login-bg.png';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthView() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div
      className="relative flex h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBG})` }}
    >
      <div className="relative z-10 flex flex-1 flex-col items-center text-center">
        <div className="relative">
          <h2 className="absolute top-10 left-1/2 w-full -translate-x-1/2 text-center text-2xl text-rose-700">
            “Payments, redefined for the modern world.”
          </h2>
          <h1 className="flex h-[450px] gap-5 text-center text-[20rem] font-bold">
            <span className="tracking-[70px]">Vel</span>
            <span className="tracking-[60px]">ora</span>
          </h1>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}
        
      </div>
    </div>
  );
}
