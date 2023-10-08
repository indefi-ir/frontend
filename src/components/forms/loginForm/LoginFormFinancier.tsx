// @ts-ignore
import { Button, Form, Input, notification } from "antd";
import { useRouter } from 'next/router';
import { useState } from "react";
import { loginFunder } from "../../../services/authService/authFunder";
import jwt_decode from "jwt-decode";

const LoginFormFinancier = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await loginFunder({ ...values })
      const decodeToken:any = jwt_decode(res.data);
      if (res) {
        console.log(res)
        localStorage.setItem('role', JSON.stringify(decodeToken?.role))
        api["success"]({
          message: <span className='text-sm text-green-500'>خوش آمدید.</span>,
          duration: 2,
        });
        router.push(`/dashboard`);
      }
    } catch (error: any) {
      api["error"]({
        message: <span className='text-sm text-red-500'>نام کاربری یا کلمه عبور اشتباه می باشد.</span>,
        duration: 2,
      });
    }
    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      <div>
        <h1 className="mb-10 text-right text-4xl text-black">ورود</h1>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="نام کاربری">
            <Input placeholder="نام کاربری" className="p-3 text-sm w-96" />
          </Form.Item>
          <Form.Item name="password" label="کلمه عبور">
            <Input.Password placeholder="کلمه عبور" className="p-3 text-sm w-96" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loading} className="w-full bg-primary-500 text-white hover:!text-white h-[55px] text-base">
              ورود
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>

  )
}
export default LoginFormFinancier