import { Link } from "react-router-dom"
import { SigninInput } from "@dishantmiyani/syntaxsnipp-common"
import { ChangeEvent, useState } from "react"

const [postInput, setPostInput] = useState<SigninInput>({
  email: "",
  password: "",
})

const handleEmail = (e : ChangeEvent<HTMLInputElement>) => {
  const {email , value} : {email : string , value : string} = e.target
  setPostInput({
    ...postInput,
    [email] : value,
  })
}

const SigninForm = () => {

  return <>
    <div className="font-bold text-4xl w-[375px]">
      Login to your account
    </div>
    <div className="text-slate-600 mt-2 text-md">
      Don't have an account? <span className="underline" ><Link to={"/signup"}>Signup</Link></span>
    </div>
    <div className="h-[64px] flex flex-col mt-8">
      <label htmlFor="small-input" className="font-bold pb-1">Username</label>
      <input type="text" placeholder="example@gmail.com" onChange={handleEmail} className="bg-white px-2 py-1 rounded-md border border-slate-400 w-[350px]" />
    </div>
    <div className="h-[64px] flex flex-col mt-3">
      <label htmlFor="small-input" className="font-bold pb-1">password</label>
      <input type="password" className="bg-white px-2 py-1 rounded-md border border-slate-400 w-[350px]" />
    </div>
    <div className="mt-4">
      <button className="bg-black text-white px-40 rounded-md h-[40px]">Signin</button>
    </div>
  </>
}

export default SigninForm