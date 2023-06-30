import { LoginFormFinancier, LoginFormCompany } from "../../components/forms";
import Image from 'next/image'
import { Card, Tabs, TabsProps } from "antd";

const Login = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `ورود سرمایه گذار`,
      children: <LoginFormFinancier />,
    },
    {
      key: '2',
      label: `ورود شرکت`,
      children: <LoginFormCompany />,
    },
  ];
  return (
    <div className="flex items-center justify-between bg-gradient-radial h-screen p-12">
      <div className="flex justify-center w-7/12">
        <div className="flex flex-col ">
          <div className="w-96">
            <h1 className="font-semibold text-3xl text-right text-white pb-4">
              وارد شوید!</h1>
            <h2 className="text-2xl text-right text-white py-2">
              سامانه تامین مالی زنجیره تامین
            </h2>
            <p className="text-base text-justify text-right text-white py-2">
              تامین مالی زنجیره تامین مجموعه ای از فرآیندهای تجاری و تامین مالی مبتنی بر فناوری است که هزینه ها را کاهش می دهد و کارایی را برای طرف های درگیر در معامله بهبود می بخشد.
            </p>
          </div>
          <Image
            src="/images/login-vector.png"
            alt="Picture of the author"
            width={650}
            height={650}
          />
        </div>
      </div>
      <div className="flex justify-center w-5/12">
        <Card className="flex flex-col justify-center p-10">
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
      </div>
    </div>
  )
}

Login.layout = 'default';

export default Login;