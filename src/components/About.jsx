import React from 'react';
import aboutImg from '../assets/images/about-img.jpg';

export default function About() {
  return (
    <section className='bg-[#014d1a] text-white px-4 flex justify-center items-center flex-col gap-4 py-10 lg:flex lg:justify-between lg:flex-row lg:gap-16 lg:px-8 '>
     
        <div className='flex flex-1 gap-6 flex-col text-center'>
          <h2 className=" text-white font-bold text-3xl lg:text-5xl">
            We Connect people, projects, and purpose.
          </h2>
          <p className="text-[1.3rem]">
            Lagos has climate crisis and a youth unemployment crisis happening at the same time.
            GreenGig Africa turns that overlap into opportunity connecting low-income youth and
            women to paid environmental work, while giving NGOs and government agencies a verified
            way to coordinate and scale.
          </p>
          <h5 className='font-bold hidden lg:block'>Real work. Real pay. Real impact</h5>
        </div>
        <div className="flex-1">
          <img src={aboutImg} alt="Youth Cleaning The Street" className='rounded-2xl' />
        </div>
    </section>
  );
}
