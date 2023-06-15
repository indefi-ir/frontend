import { LoginForm } from "../../components/forms";
import Image from 'next/image'

const Login = () => {
  return (
    <div className="flex items-center justify-between bg-[url('/images/bg-login.jpeg')] bg-no-repeat	bg-cover h-screen p-12">
      <div className="w-1/3">
        <LoginForm />
      </div>
      <div className="flex justify-center w-2/3">
        <div className="flex flex-col">
        <h1 className="font-semibold text-[35px] text-center text-purple">
        وارد شوید!</h1>
        <h2>
        سامانه تامین مالی زنجیره تامین
        </h2>
        <p>
        تامین مالی زنجیره تامین مجموعه ای از فرآیندهای تجاری و تامین مالی مبتنی بر فناوری است که هزینه ها را کاهش می دهد و کارایی را برای طرف های درگیر در معامله بهبود می بخشد. 
        </p>
          <Image
            src="/images/login-vector.png"
            alt="Picture of the author"
            width={650}
            height={650}
          />
        </div>
      </div>
    </div>
  )
}

Login.layout = 'default';

export default Login;