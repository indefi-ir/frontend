import { Button, Form, Input } from "antd"

const LoginForm = () => {
  <div className="bg-wite rounded-md">
    <Form>
      <Form.Item
        name="username"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}
export default LoginForm