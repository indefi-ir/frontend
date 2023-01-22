import { Button, Form, Input, SelectProps } from "antd";
import React, { useState } from "react";
import { mutate } from "swr";
import { addFinancierUrl, financiersUrl } from "../../../services/apiEndpoint";
import { post } from "../../../services/axios";
import { userInfoContext } from "../../providers/userInfoProvider/UserInfoProvider";

interface Props {
  closeModal: () => void;
}

const EditFinanciersForm = ({ closeModal }: Props) => {
  const [form] = Form.useForm();
  const { id: regulatorId }: any = React.useContext(userInfoContext);
  const [isFiledTouched, setIsFiledTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onFinish = async (values: any) => {
    const FinalData = { ...values, regulatorId, walletReference: "walletReference" }
    const result = await post(addFinancierUrl, FinalData)
    await mutate(`${financiersUrl}${regulatorId}`);
    if (result?.statusCode == "OK") {
      form.resetFields();
      closeModal();
      setError("");
    } else {
      setError(result?.response?.data)
      form.resetFields();
    }
  }

  return (
    <div className="mt-6">
      {error &&
        <div className="text-red-500 mb-4">{error}</div>
      }
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        onFieldsChange={() => setIsFiledTouched(true)}
        layout="horizontal">
        <Form.Item label="Name">
          <Input className="ml-2" required />
        </Form.Item>
        <Form.Item label="Email">
          <Input className="ml-2" required />
        </Form.Item>
        <Form.Item label="Password">
          <Input className="ml-2" required />
        </Form.Item>
        <div className="mt-10 flex w-full flex-row-reverse">
          <Button htmlType="submit" className="ml-2 bg-blue text-white hover:bg-blue-dark hover:!text-white">
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