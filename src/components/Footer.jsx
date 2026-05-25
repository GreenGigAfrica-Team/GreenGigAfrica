import footerLogo from '../assets/images/footer-logo.png'

export default function Footer() {
  return (
    <footer className="bg-[#012e10] ml-auto mr-auto py-4 flex flex-col px-4 md:py-10">
      <div className=''>
        <div className='flex flex-col gap-4 md:grid md:grid-cols-5 md:pb-10 md:gap-4'>
        <div className='md:col-span-2'>
          <img src={footerLogo} alt="" className='w-50 h-30  -mb-10 -ml-10' />
          <p className='text-[rgba(255,255,255,0.50)] font-semibold'>Connecting low-income youth and women <br /> across Lagos to paid climate micro-jobs</p>
        </div>
        <div className='text-[rgba(255,255,255,0.50)]'>
          <h4 className='text-white font-semibold pb-2'>COMPANY</h4>
          <ul className='flex  flex-col gap-2'>
            <li>About us</li>
            <li>Our impact</li>
            <li>Partners</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='text-[rgba(255,255,255,0.50)]'>
          <h4 className='text-white font-semibold pb-2'>PLATFORM</h4>
          <ul className='flex  flex-col gap-2'>
            <li>Find Jobs</li>
            <li>Post a job</li>
            <li>Volunteer</li>
            <li>How it works</li>
          </ul>
        </div>
        <div className='text-[rgba(255,255,255,0.50)]'>
          <h4 className='text-white font-semibold pb-2'>LEGAL</h4>
            <ul className='flex  flex-col gap-2'>
            <li>Privacy policy</li>
            <li>Terms of service</li>
            <li>Cookie policy</li>
    
          </ul>
        </div>
      </div>
      <div className='flex flex-col my-10 gap-4 border-t border-[rgba(255,255,255,0.10)] pt-10 text-[rgba(255,255,255,0.50)] md:flex md:justify-between md:items-center md:flex-row'>
        <div className='text-center'>
          <p>&copy; {new Date().getFullYear()} GreenGig Africa. All rights reserved.</p>
        </div>
        <div>
          <ul className=' flex gap-4 justify-center md:justify-between'>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      </div>
      
    </footer>
  )
}