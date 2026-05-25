import { useState } from 'react';
import HLogo from './HLogo';
import Nav from './Nav';
import Hbtns from './Hbtn';
import { Menu, X } from 'lucide-react';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when a link is clicked
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className="flex items-center justify-between bg-[#fffff] text-black-400  px-6 h-20 w-full"
    >
      <HLogo />

      {/* Desktop Navigation (Hidden on Mobile) */}

   {/* Desktop Navigation */}
<div className="hidden lg:flex flex-1 justify-center items-center">
  <Nav />
</div>

<div className="hidden lg:flex">
  <Hbtns />
</div>


      {/* Mobile Toggle Icon */}
      <button className="lg:hidden z-60 my-auto" onClick={toggleMenu}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`
        fixed top-0 left-0 h-screen bg-white shadow-2xl transition-transform duration-300 ease-in-out z-55
        flex flex-col p-10 gap-8
        w-[70%] sm:w-[40%] lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <Nav closeMenu={() => setIsOpen(false)} />
        <Hbtns />
      </div>

      {/* Dark background blur when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

    
    </header>
  );
}
