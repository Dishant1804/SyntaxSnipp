import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@dishantmiyani/syntaxsnipp-common"
import axios from "axios"
import { BACKEND_URL } from '../config'

const SignupForm = () => {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  })

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({
      ...signupInput,
      name: e.target.value,
    })
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({
      ...signupInput,
      email: e.target.value,
    })
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({
      ...signupInput,
      password: e.target.value,
    })
  }

  async function sendRequest() {
    try {
      const result = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInput)
      const jwt = result.data.jwt;
      console.log(jwt);
      localStorage.setItem('token', "Bearer " + jwt);
      navigate("/signin")
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
    <div className="font-bold text-4xl w-[375px] flex justify-center">
      Create an account
    </div>
    <div className="text-slate-600 mt-2 text-md">
      Alreday have an account? <span className="underline" ><Link to={"/signin"}>Login</Link></span>
    </div>
    <div className="h-[64px] flex flex-col mt-8">
      <label htmlFor="small-input" className="font-bold pb-1">Name</label>
      <input type="text" onChange={handleName} className="bg-white px-2 py-1 rounded-md border border-slate-400 w-[350px]" />
    </div>
    <div className="h-[64px] flex flex-col mt-3">
      <label htmlFor="small-input" className="font-bold pb-1">Email</label>
      <input type="text" placeholder="example@gmail.com" onChange={handleEmail} className="bg-white px-2 py-1 rounded-md border border-slate-400 w-[350px]" />
    </div>
    <div className="h-[64px] flex flex-col mt-3">
      <label htmlFor="small-input" className="font-bold pb-1">Password</label>
      <input type="password" onChange={handlePassword} className="bg-white px-2 py-1 rounded-md border border-slate-400 w-[350px]" />
    </div>
    <div className="mt-4">
      <button onClick={sendRequest} className="bg-black text-white px-40 rounded-md h-[40px]">Signup</button>
    </div>
  </>
}

export default SignupForm