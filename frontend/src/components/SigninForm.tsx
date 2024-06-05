import { Link , useNavigate } from "react-router-dom"
import { SigninInput } from "@dishantmiyani/syntaxsnipp-common"
import { ChangeEvent, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from '../config'


const SigninForm = () => {
  const navigate = useNavigate();
  const [signinInput, setSigninInput] = useState<SigninInput>({
    email: "",
    password: "",
  })

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setSigninInput({
      ...signinInput,
      email: e.target.value,
    })
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setSigninInput({
      ...signinInput,
      password: e.target.value,
    })
  }

  async function sendRequest() {
    try {
      const result = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInput)
      const jwt = result.data.jwt;
      localStorage.setItem('token', "Bearer " + jwt);
      navigate("/posts")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert('Signup failed. Please try again later.');
        }
        else {
          alert('Signup failed. An unexpected error occurred.');
        }
      }
    }
  }

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
      <label htmlFor="small-input" className="font-bold pb-1">Password</label>
      <input type="password" onChange={handlePassword} className="bg-white px-2 py-1 rounded-md border border-slate-400 w-[350px]" />
    </div>
    <div className="mt-4">
      <button onClick={sendRequest} className="bg-black text-white px-40 rounded-md h-[40px]">Signin</button>
    </div>
  </>
}

export default SigninForm