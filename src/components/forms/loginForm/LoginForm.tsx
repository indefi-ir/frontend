import { Button, Form, Input } from "antd";
import { useRouter } from 'next/router';
import { login } from "../../../services/authService/auth";

const LoginForm = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const res = await login({...values}) 
      if (res?.data?.data) {
        router.push(`/dashboard`);
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg h-fit py-20 px-14 shadow-md">
      <h1 className="mb-10 text-right text-4xl text-black">ورود</h1>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="username" label="نام کاربری">
          <Input placeholder="نام کاربری" className="p-3 text-sm w-96"/>
        </Form.Item>
        <Form.Item name="password" label="کلمه عبور">
          <Input placeholder="کلمه عبور" className="p-3 text-sm w-96" type="password"/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="w-full bg-primary-500 text-white hover:!text-white h-[55px] text-base">
            ورود
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoginForm