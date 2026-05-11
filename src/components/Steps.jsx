import React from 'react';
import { useState } from 'react';
import phoneIcon from '../assets/images/iconpack/phone icon.svg'
import searchIcon from '../assets/images/iconpack/browse task icon.svg'
import paymentIcon from '../assets/images/iconpack/payment icon.svg'
import volunteerIcon from '../assets/images/iconpack/volunteer icon.svg'
import checkMarkIcon from '../assets/images/iconpack/checkmark icon.svg'
import certificateIcon from '../assets/images/iconpack/certificate icon.svg'
import organizationIcon from '../assets/images/iconpack/organization icon.svg'
import postTaskIcon from '../assets/images/iconpack/post task icon.svg'
import verifyIcon from '../assets/images/iconpack/verify icon.svg'

 const howItWorks = [
    {
      id: 1,
      icon: phoneIcon,
      step: '01',
      type: 'workers',
      title: 'Sign up with your phone number',
      description:
        'No CV, no email, no stress. Enter your phone number, verify with OTP, and set up your profile in under 2 minutes.'
    },

    {
      id: 2,
      icon: searchIcon,
      step: "02",
      type: "workers",
      title: "Browse task near you",
      description:
        "See available climate micro-jobs in your LGA. Each task shows exactly what to do, where to go, and how much you'll earn."
    },

    {
      id: 3,
      icon: paymentIcon,
      step: "03",
      type: "workers",
      title: 'Complete task & get paid',
      description:
      "Submit photo proof when done. Once approved by the organisation, payment goes straight to your OPay or PalmPay wallet."
    },

    {
      id: 4,
      icon: volunteerIcon,
      step: "01",
      type: "volunteers",
      title: "Sign up as a volunteer",
      description:
        "Join as a volunteer — perfect for students, NYSC corp members, and climate-conscious Lagosians. Free to join, always."
    },

    {
      id: 5,
      icon: checkMarkIcon,
      step: "02",
      type: "volunteers",
      title: "Complete climate tasks",
      description:
        "Accept and complete the same verified climate tasks as paid workers. Your impact is tracked and recorded automatically."
    },

    {
      id: 6,
      icon: certificateIcon,
      step: "03",
      type: "volunteers",
      title: "Earn your certificate",
      description:
        "Download a verified certificate of participation and watch your impact score grow as each completed task gets logged."
    },

    {
      id: 7,
      icon: organizationIcon,
      step: "01",
      type: "organizations",
      title: "Register your organisation",
      description:
        "Submit your organisation's details for manual verification. Once approved, you can start posting tasks immediately."
    },

    {
      id: 8,
      icon: postTaskIcon,
      step:  "02",
      type: 'organizations',
      title: 'Post tasks & find workers',
      description:
        "Set your task type, location, pay rate, and worker count. Tasks go live instantly and workers in your LGA see them immediately."
    },

    {
      id: 9,
      icon: verifyIcon,
      step:"03",
      type: "organizations",
      title: "Verify, pay & report impact",
      description:
        "Review GPS-tagged photo proof, approve completions, and disburse payments in bulk. Export an impact report in one click."
    },
  ];
export default function Steps() {
 const [activeTab, setActiveTab] = useState('workers')

  const tabs = ['workers', 'volunteers', 'organizations'];
  
  const filteredCards = howItWorks.filter((stepCard) => stepCard.type === activeTab,
  )
     console.log('activeTab:', activeTab)
    console.log('filteredCards:', filteredCards)

  return (
    <section className="flex justify-center items-center flex-col gap-4 py-10">
      <div className="flex justify-center items-center flex-col mb-2">
        <h1 className="text-4xl font-bold pb-3">Simple Steps. Real Impact</h1>
        <p className='text-center text-gray-600'>
          Whether you are looking for flexible income or need verified climate
          workers, <br /> GreenGig Africa connects you in minutes.
        </p>
      </div>
      <div className="flex justify-center  items-center w-full gap-20 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-0.7 transition-colors  ${activeTab === tab ? "border-b-2 border-[#00ce2e] text-[#00ce2e]": "text-gray-400 "}`}>
             For {tab}
          </button>
        ))}
      </div>
   

      <div className="flex justify-between  gap-8 max-w-400 py-4 ml-auto mr-auto w-[90%]">
        {filteredCards.map((stepCard) => (
          <div
            key={stepCard.id}
            className="relative bg-[#f5f5f5] rounded-[10px] w-full  h-full flex-1  py-8 px-4">
            <img src= {stepCard.icon} alt= {stepCard.title} />
            <h2 className="absolute top-2 right-2 text-5xl font-bold text-[]">
              {stepCard.step}
            </h2>
            <h6 className="font-bold text-[1.1rem] text-left pb-1 pt-4"> {stepCard.title}</h6>
            <p className='w-full text-left'>{stepCard.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
