import { NavHashLink } from 'react-router-hash-link';

const Navbar = ({ isMenuOPen, closeMenu }) => {
  return (
    <nav className="flex flex-col lg:flex-row gap-6 lg:gap-4 text-black ">
      <NavHashLink
        to="/#" onClick={closeMenu} 
        className='relative w-fit inline-block
            after:content-[""]
            after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8'
        href=""
      >
        Home
      </NavHashLink>

     <NavHashLink
  to="/#"
  onClick={closeMenu}
  className='relative w-fit inline-block
      after:content-[""]
      after:absolute after:-bottom-0.5 after:left-0 
      after:w-0 after:h-0.5 after:bg-[#00ce2e] 
      after:transition-all hover:after:w-full'
>
  About
</NavHashLink>


      <NavHashLink
        to="/#" onClick={closeMenu} 
        className='relative w-fit inline-block after:absolute 
            after:content-[""]
            after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8'
        href=""
      >
        Get Started
      </NavHashLink>

      <NavHashLink
        to="/#" onClick={closeMenu} 
        className='relative w-fit inline-block after:absolute
            after:content-[""]
            after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8'
        href=""
      >
        Our mission
      </NavHashLink>

      <NavHashLink
        to="/#task" onClick={closeMenu} 
        onClick={closeMenu}
        className='relative w-fit inline-block after:absolute 
            after:content-[""]
            after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8'
        href=""
      >
        Browse Task
      </NavHashLink>

      <NavHashLink
        to="" onClick={closeMenu} 
        className='relative w-fit inline-block after:absolute
            after:content-[""]
            after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-[#00ce2e] after:transition-all hover:after:w-full underline-offset-8'
        href=""
      >
        Contact
      </NavHashLink>
    </nav>
  );
};
export default Navbar
