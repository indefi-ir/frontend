import { Button, Form, Input } from "antd";
import { useRouter } from 'next/router';

const LoginForm = () => {
  const router = useRouter();

  const onFinish = (values: any) => {
    router.push(`/dashboard`);
  };

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg h-fit p-10">
      <h1 className="mb-10 text-center font-semibold text-[25px] text-purple">Sign In</h1>
      <Form onFinish={onFinish}>
        <Form.Item name="username">
          <Input placeholder="Email" className="p-4 text-lg"/>
        </Form.Item>
        <Form.Item name="password">
          <Input placeholder="Password" className="p-4 text-lg"/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="w-full bg-purple text-white hover:text-white h-[55px] text-lg">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoginForm