import Quote from "../components/Quote"
import SignupForm from "../components/SignupForm"

const Signup = () => {
  return <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
    <div className="justify-center items-center flex flex-col h-auto">
      <SignupForm />
    </div>
    <div className="justify-center font-bold items-center text-4xl flex-col bg-neutral-100 rounded-3xl hidden lg:flex">
      <Quote />
    </div>
  </div>
}

export default Signup