import img from '../assets/images/analysis.jpg';
import lightImg from '../assets/images/light-bg.jpg';
import sparkImg from '../assets/images/bg-spark.jpg';
const LoginView = () => {
  return (
    <div className="flex items-center justify-center h-full" >
      <div className='p-6 flex flex-col items-center gap-5 border-2 rounded-2xl shadow-xl'>
        <div>
            <img className='w-24 h-24 rounded-full' src={img} alt="" />
        </div>
        <div className='text-4xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent tracking-tighter'>
            Let's get you Started
        </div>
        <div className=''>Trade over 2,100 cryptocurrencies safely, quickly, and easily</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoginView;
