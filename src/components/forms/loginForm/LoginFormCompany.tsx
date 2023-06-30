import { Button, Form, Input } from "antd";
import { useRouter } from 'next/router';
import { useState } from "react";
import { loginCompany } from "../../../services/authService/authCompany";
import { fetcher, get } from "../../../services/axios";
import { myCompanyInfoUrl } from '../../../services/apiEndpoint';

const LoginFormCompany = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await loginCompany({ ...values })
      if (res?.data?.data) {
        localStorage.setItem('role', JSON.stringify(res?.data?.role))
        router.push(`/dashboard`);
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="mb-10 text-right text-4xl text-black">ورود</h1>
      <Form onFinish={onFinish} layout="vertical" autoComplete="false">
        <Form.Item name="username" label="شناسه ملی شرکت">
          <Input placeholder="شناسه ملی شرکت" className="p-3 text-sm w-96" />
        </Form.Item>
        <Form.Item name="password" label="کلمه عبور">
          <Input placeholder="کلمه عبور" className="p-3 text-sm w-96" type="password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={loading} className="w-full bg-primary-500 text-white hover:!text-white h-[55px] text-base">
            ورود
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoginFormCompany