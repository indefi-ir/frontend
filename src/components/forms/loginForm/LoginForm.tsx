import { Button, Form, Input } from "antd";
import { useRouter } from 'next/router';
import { login } from "../../../services/authService/auth";

const LoginForm = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const res = await login({...values}) 
      if (res?.data?.message) {
        router.push(`/dashboard`);
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg h-fit p-14">
      <h1 className="mb-10 text-center font-semibold text-[25px] text-primary-500">ورود</h1>
      <Form onFinish={onFinish}>
        <Form.Item name="username">
          <Input placeholder="Username" className="p-4 text-base"/>
        </Form.Item>
        <Form.Item name="password">
          <Input placeholder="Password" className="p-4 text-base" type="password"/>
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