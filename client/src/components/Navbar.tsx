import { BiLogoFacebookSquare } from "react-icons/bi";
const Navbar = () => {
  return (
    <div className="bg-gray-400 w-[60%] items-center mx-auto flex justify-between">
        <div className="w-10 h-10">
          <BiLogoFacebookSquare className="w-10 h-10"/>
        </div>
        <div className="flex justify-between font-semibold px-8 w-1/2">
            <p>User</p>
            <p>SignUp</p>
            <p>SignIn</p>
        </div>
    </div>
  )
}

export default Navbar