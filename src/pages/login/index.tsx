import { LoginForm } from "../../components/forms";
import Image from 'next/image'

const Login = () => {
  return (
    <div className="flex items-center justify-between bg-[url('/images/bg-login.jpeg')] bg-no-repeat	bg-cover h-screen p-12">
      <div className="flex justify-center w-2/3">
        <div className="flex flex-col">
          <Image
            src="/images/login-vector.svg"
            alt="Picture of the author"
            width={650}
            height={650}
          />
          <h1 className="font-semibold text-[35px] text-center text-purple">Fast, Efficient and Productive</h1>
        </div>
      </div>
      <div className="w-1/3">
        <LoginForm />
      </div>
    </div>
  )
}

Login.layout = 'default';

export default Login;