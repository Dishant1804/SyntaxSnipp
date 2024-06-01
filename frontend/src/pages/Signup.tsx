import Quote from "../components/Quote"
import SignupForm from "../components/SignupForm"

const Signup = () => {
  return <div className="grid grid-cols-2 h-screen">
    <div className="justify-center items-center flex flex-col h-auto">
      <SignupForm />
    </div>
    <div className="flex justify-center items-center text-4xl flex-col bg-neutral-100 rounded-3xl">
      <Quote />
    </div>
  </div>
}

export default Signup