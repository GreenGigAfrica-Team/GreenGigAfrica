// import  {useState } from "react";


export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-green-400 text-black-400">
 <div className="">
      <img src="" alt="" />
    </div>
    <div className="flex">
        <ul className="flex space-x-4">
          <li><a href="">Home</a></li>
          <li><a href="">About</a></li>
          <li><a href="">Get Started</a></li>
          <li><a href="">Our mission</a></li>
          <li><a href="">Browse Task</a></li>
          <li><a href="">Contact</a></li>
        </ul>
      </div>
      <div className="flex space-x-2">
        <button className="border border-green-400 text-black-400 hover:border border-green-600 hover:text-white">Log In</button>
        <button className="bg-green-700 border border-none rounded-xl p-3 text-center text-white">Sign Up</button>
      </div>
    </div>
   
  )

}
