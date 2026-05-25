import cameraIcon from '../assets/images/iconpack/camera icon.svg'
import aiIcon from '../assets/images/iconpack/ai icon.svg'
import checkMarkIcon from '../assets/images/iconpack/checkmark icon.svg'



export default function Features() {
  const greenGigAfricaFeatures = [
  
    {
    icon: cameraIcon,
    id: 1,
    title: "Multi-stage photo proof",
    description:"Photos required at task start, during and completion with automatic GPS location and timestamp. No single staged photo accepted"
    },


    {
      icon: aiIcon,
      id: 2,
      title: "AI image validation",
      description:"Every submission is scanned by AI to confirm it contains relevant content like waste, trees or farming  activity. Irrelevant photos are flagged automatically."
    },


    {
      icon: checkMarkIcon,
      id: 3,
      title: "Approval before payment",
      description:"Payment are only released after an organization reviewer approves your proof of work. Full transparency across every process."
    }
  

]

  return (
    <section className=" flex justify-center items-center flex-col bg-[#f5f5f5] py-12 px-4">
      <div className="flex justify-center items-center flex-col text-center gap-2">
          <h2 className="text-[1.8rem] text-[#1a1a1a] leading-9 pb-4 font-bold md:text-[2.27rem]">Your work is verified. Your pay is guaranteed</h2>
        <p className="text-[1.2rem]">Trust is GreenGig Africa's foundation. Every task, every submission,  <br /> every payment is protected by layers of verification.</p>
      </div>
      <div className="flex flex-col justify-between
       gap-8 max-w-400 py-4 px-4  w-full md:flex md:flex-row md:max-w-400 md:items-stretch">
        {greenGigAfricaFeatures.map((featuresCard) => (
          <div key={featuresCard.id}
            className="flex  items-center flex-col flex-1 px-4 w-full  py-4 rounded-[10px] bg-white border border-[#e0e0e0] ">
            <div className="w-12 h-12 bg-[#dcfcefcd] rounded-md flex justify-center items-center px-2 py-2 my-6">
              <img src={featuresCard.icon} alt="" /></div>
            
            <h6 className="text-center font-bold text-[1.1rem] pb-1 mt-auto">{featuresCard.title}</h6>
            <p className="mt-auto text-center">{featuresCard.description}</p>
          </div>
        ))}
      </div>
    </section>

  )
}