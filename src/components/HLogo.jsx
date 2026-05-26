import headerLogo from '../assets/images/header-logo.webp'



export default function HeaderLogo() {
  return (
    <div className='flex self-center'>
       <img src={headerLogo} alt="Header 
        Logo" className='w-30 h-auto'/>
    </div>
       
  )
}