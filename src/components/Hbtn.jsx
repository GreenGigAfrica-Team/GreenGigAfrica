import { useNavigate } from 'react-router-dom';
import '../assets/styles/header.css';

export default function Btns() {
   const navigate = useNavigate();
  return (
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
         <button onClick={() => navigate('/signin/verify')} className=" logIn border-2 w-full lg:w-auto border-solid border-[#00ce2e] rounded-xl text-green-600 py-[0.6em] px-[0.8em] hover:text-[#00ce2e]">

          Log In
        </button>
        <button onClick={() => navigate('/onboarding/phone')} className="sign-up w-full lg:w-auto border border-none rounded-xl py-[0.6em] px-[0.8em] text-center text-white bg-[#038c30]">
          Sign Up
        </button>
      </div>
  )
}