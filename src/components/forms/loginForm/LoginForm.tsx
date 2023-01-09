import { Button, Form, Input } from "antd"

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center bg-white rounded-lg h-fit p-10">
      <h1 className="mb-10 text-center font-semibold text-[25px] text-purple">Sign In</h1>
      <Form>
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