import { FaApple, FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const SocialLogins = () => {
  return (
    <div className="flex flex-col items-center">
    <div className="text-[#5F646D] bodyMediumRegular">
      or continue with
    </div>
    <div className="flex justify-center items-center space-x-8 mt-5">
      <FcGoogle className="h-[25px] w-[25px] flex items-center" />
      <div className="bg-white w-[105px] h-[51px] shadow-[0px_0px_34px_0px_#00000026] flex justify-center items-center rounded">
        <FaApple className="h-[25px] w-[25px]" />
      </div>
      <FaFacebook
        fill="blue"
        className="h-[25px] w-[25px] flex items-center"
      />
    </div>
  </div>
  )
}

export default SocialLogins