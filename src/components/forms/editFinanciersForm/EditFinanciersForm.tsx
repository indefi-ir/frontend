import { Button, Form, Input, SelectProps } from "antd";

const EditFinanciersForm = () => {
  const options: SelectProps['options'] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  return (
    <div className="mt-6">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal">
        <Form.Item label="Name">
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="Email">
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="Password">
          <Input className="ml-2" />
        </Form.Item>
        <div className="mt-10 flex w-full flex-row-reverse">
          <Button htmlType="submit" className="ml-2">
            Edit
          </Button>
          <Button htmlType="button">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default EditFinanciersForm