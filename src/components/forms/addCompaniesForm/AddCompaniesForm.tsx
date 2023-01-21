import { Button, Form, Input } from "antd";
import { post } from "../../../services/axios";

const AddCompaniesForm = () => {
  const onFinish = async (values:any) => {
    const FinalData = { ...values, regulatorId: "d80ae806-81a3-424f-93f1-e285b2dd02b2", "walletReference": "string"}
    const result = await post ('/api/Companies/add', FinalData)
  }

  return (
    <div className="mt-6">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        layout="horizontal">
        <Form.Item label="Name" name="name">
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input className="ml-2" />
        </Form.Item>
        <div className="mt-10 flex w-full flex-row-reverse">
          <Button htmlType="submit" className="ml-2 bg-blue text-white hover:bg-blue-dark hover:!text-white">
            Add
          </Button>
          <Button htmlType="button">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default AddCompaniesForm