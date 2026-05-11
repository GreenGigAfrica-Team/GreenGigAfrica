import  React from "react";
import '../assets/styles/header.css';
import headerLogo from '../assets/images/header-logo.png'

export default function Header() {
  return (
    <header className="fixed z-10 flex items-center justify-between bg-[#fffff] text-black-400 py-6 px-6 h-[10vh] w-full"
      style={
        {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter:" blur(10px)",
          boxShadow:"0 6px 30px rgba(0, 0, 0, 0.25)"
      }
      }>
      <div className="logo flex items-center">
        <img src={headerLogo} alt="Header 
        Logo" className='w-30 h-30' />
      </div>
      <div className="flex">
        <ul className="nav-links flex gap-8">
          <li>
            <a className='relative 
            after:content-[""]
            after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8' href="">Home</a>
          </li>
          <li>
            <a className='relative 
            after:content-[""]
            after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8' href="">About</a>
          </li>
          <li>
            <a className='relative after:absolute 
            after:content-[""]
            after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8' href="">Get Started</a>
          </li>
          <li>
            <a className='relative after:absolute
            after:content-[""]
            after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8' href="">Our mission</a>
          </li>
          <li>
            <a className='relative after:absolute 
            after:content-[""]
            after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8'  href="">Browse Task</a>
          </li>
          <li>
            <a className='relative after:absolute
            after:content-[""]
            after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8' href="">Contact</a>
          </li>
        </ul>
      </div>
      <div className="flex gap-6">
         <button className=" logIn border-2 border-solid border-[#00ce2e] rounded-xl text-white py-[0.6em] px-[0.8em] hover:text-[#00ce2e]">
          Log In
        </button>
        <button className="sign-up border border-none rounded-xl py-[0.6em] px-[0.8em] text-center text-white bg-[#038c30]">
          Sign Up
        </button>
      </div>
    </header>
  )
}
