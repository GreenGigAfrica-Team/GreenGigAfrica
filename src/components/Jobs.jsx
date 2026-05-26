import React from "react";
import wasteBinIcon from '../assets/images/iconpack/waste collection icon.webp'
import treePlantingIcon from '../assets/images/iconpack/tree planting icon.webp'

export default function Features() {
  const jobSection = [
  
    {
    icon: wasteBinIcon,
    id: 1,
    title: "Waste Collection",
    description:"Community waste collection and sorting in Alimosho and other high-density Lagos areas. Direct LAWMA alignment."
    },


    {
      icon: treePlantingIcon,
      id: 2,
      title: "Tree Planting",
      description:"Seedling planting and monitoring for mangrove restoration and reforestation in Epe LGA and costal areas."
    },
]

  return (
    <section className="flex justify-center items-center flex-col bg-[#026c24] py-10 text-white px-4">
      <div className="flex justify-center items-center flex-col mb-8 gap-2">
        <h2 className="text-[1.8rem] font-bold md:text-4xl">Climate work that pays</h2>
        <p className="text-center text-white text-[1.2rem]">From Lagos waste crisis to coastal restoration. Real environmental work, <br /> verified and commensated</p>
      </div>
      <div className="flex gap-3 overflow-x-auto  max-w-full scrollbar-hide md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 lg:max-w-400 lg:py-4 lg:ml-auto lg:mr-auto lg:w-[60%] lg:gap-4">
        {jobSection.map((jobsCard) => (
          <div key={jobsCard.id}
          className="py-8 px-4 rounded-[10px] bg-[#014d1a] w-80 shrink-0 lg:w-full lg:shrink">
            <img src= {jobsCard.icon}alt= {jobsCard.title} className='w-8 h-8 mb-3' />
            <h6 className="text-left font-bold text-[1.1rem] pb-1">{jobsCard.title}</h6>
            <p className="">{jobsCard.description}</p>
          </div>
        ))}
      </div>
    </section>

  )
}