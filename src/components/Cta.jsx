import { useNavigate } from "react-router-dom";
import React from 'react';
import treePlantingIcon from '../assets/images/iconpack/tree planting icon.svg'

export default function Cta() {
   const navigate = useNavigate();
  return (
    <section className='flex justify-center items-center flex-col ml-auto mr-auto py-10' style={
      {
        background: "linear-gradient(135deg, #014d1a 0%, #012e10 100% )",
        maxHeight: "600px"
    }
    }>
      <div className='flex gap-4 flex-col px-4 mb-10'>
        <h1 className='text-[1.8rem] font-bold text-white text-center'>Be Part of Africa's climate workforce</h1>
        <p className= ' text-[1.2rem] text-white text-center'>Find paid tasks, volunteers, or post climate jobs in your <br /> community</p>
      </div>
      <div className='flex gap-4 max-w-full'>
        <button onClick={() => navigate('/onboarding/phone')} className='bg-[#00ce2e] py-3 px-4 rounded-xl font-semibold flex gap-2 items-center text-[1rem]'> <img src= {treePlantingIcon} alt="" />Find climate work</button>
        <button className='border-[0.17rem] border-white py-2 px-4 rounded-xl text-white font-semibold'>Post a job</button>
      </div>
    </section>
  )
}