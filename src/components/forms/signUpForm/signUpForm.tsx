import { Button, Form, Input } from "antd";
import { useRouter } from 'next/router';
import { login } from "../../../services/authService/auth";
import Link from 'next/link'

const SignUpForm = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const res = await login({...values})
      if (res?.data?.token) {
        router.push(`/dashboard`);
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg h-fit pt-8 pb-0 px-8">
      <h1 className="mb-10 text-center font-semibold text-[25px] text-purple">ثبت نام در سامانه</h1>
      <Form onFinish={onFinish}>
        <Form.Item name="name">
          <label className="mb-2 block" htmlFor="">نام شرکت</label>
          <Input className="p-2 text-base"/>
        </Form.Item>
        <Form.Item name="id">
          <label className="mb-2 block" htmlFor="">شناسه ملی شرکت</label>
          <Input className="p-2 text-base"/>
        </Form.Item>
        <Form.Item name="nationalCode">
          <label className="mb-2 block" htmlFor="">کد ملی مدیرعامل</label>
          <Input className="p-2 text-base"/>
        </Form.Item>
        <Form.Item name="mobilNumber">
          <label className="mb-2 block" htmlFor="">شماره همراه مدیرعامل (مطابق کدملی)</label>
          <Input className="p-2 text-base"/>
        </Form.Item>
        <Form.Item name="customerId">
          <label className="mb-2 block" htmlFor="">شماره مشتری در بانک پاسارگاد</label>
          <Input className="p-2 text-base"/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="w-full bg-purple text-white hover:!text-white h-[55px] text-base">
            ثبت نام
          </Button>
        </Form.Item>
      </Form>
      <Link href="/login">قبلا ثبت نام کرده ام. <span className="text-blue">ورود به سامانه</span></Link>
    </div>
  )
}
export default SignUpForm