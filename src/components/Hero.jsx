import { useNavigate } from "react-router-dom";
import "../assets/styles/hero.css"
import heroBg from "../assets/images/hero-img.webp"
import globeIcon from '../assets/images/iconpack/globe icon.webp'


export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-cover bg-center bg-no-repeat  flex h-screen justify-center items-center flex-col gap-5 px-6"
      style={{
        backgroundImage: `
        radial-gradient(circle at right, rgb(1, 46, 16), transparent 45%),
        radial-gradient(circle at left, rgb(1, 46, 16), transparent 85%),
    url(${heroBg})`
      }}>
      <div className="w-full  px-1 ">
        <h1 className="text-5xl text-center font-bold text-white pb-5  mx-auto md:w-full">Work Green, <span className="text-[#00CC2C]">Earn Clean.</span></h1>
        <p className="text-white text-center text-[1.2rem] md:w-[40%] md:mx-auto">Connect to paid climate micro-jobs in your community waste collection, tree planning, urban farming and more.
          Get paid fast via mobile money.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full mb-5 mt-3 md:justify-center   sm:flex-row sm:justify-center">
        <button onClick={() => navigate('/onboarding/phone')} className="bg-green-900 py-2.5 px-6 rounded-md text-white">Find climate jobs</button>
        <button className="job-btn border-[2.4px] border-solid border-white py-2.5 px-5 rounded-md text-white">Post a job</button>
      </div>
      <div className="flex justify-center items-center w-full px-5">
        <div className="flex flex-row gap-2 ">
          <img src={globeIcon} alt="Globe" className="w-6 h-6"/>
          <span className=" text-white text-[1rem]"> Connecting workers to verified climate organisations across Lagos</span>
        </div>
        
      </div>
    </section>
  )
}