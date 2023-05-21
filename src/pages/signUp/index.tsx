import { SignUpForm} from "../../components/forms";
import Image from 'next/image'

const SignUp = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between xl:bg-[url('/images/bg-login.jpeg')] bg-no-repeat bg-cover h-screen p-12">
      <div className="flex justify-center xl:w-2/3 w-full">
        <div className="flex flex-col">
          <Image
            src="/images/supply-chain-finance.png"
            alt="Picture of the author"
            width={650}
            height={650}
          />
          <h1 className="font-semibold text-[35px] text-center text-purple">تامین مالی زنجیره تامین</h1>
        </div>
      </div>
      <div className="xl:w-1/3 w-full">
        <SignUpForm />
      </div>
    </div>
  )
}

SignUp.layout = 'default';

export default SignUp;