import { Link } from "react-router-dom"

const SignupForm = () => {

  return <>
    <div className="font-bold text-4xl w-[375px]">
      Create an account
    </div>
    <div className="text-slate-600 mt-2 text-md">
      Alreday have an account? <span className="underline" ><Link to={"/signin"}>Signin</Link></span>
    </div>
    <div className="h-[64px] flex flex-col mt-8">
      <label htmlFor="small-input" className="font-bold pb-1">Username</label>
      <input type="text" placeholder="example@gmail.com" className="bg-white px-2 py-1 rounded-md border border-slate-400 w-[350px]" />
    </div>
    <div className="h-[64px] flex flex-col mt-3">
      <label htmlFor="small-input" className="font-bold pb-1">password</label>
      <input type="password" className="bg-white px-2 py-1 rounded-md border border-slate-400 w-[350px]"/>
    </div>
    <div className="mt-4">
      <button className="bg-black text-white px-40 rounded-md h-[40px]">Signin</button>
    </div>
  </>
}

export default SignupForm