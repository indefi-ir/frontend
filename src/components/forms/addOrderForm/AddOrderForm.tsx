import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { mutate } from "swr";
import { addCompanyUrl, companiesUrl } from "../../../services/apiEndpoint";
import { post } from "../../../services/axios";
import { userInfoContext } from "../../providers/userInfoProvider/UserInfoProvider";
const { TextArea } = Input;

interface Props {
  closeModal: () => void;
}

const AddOrderForm = ({ closeModal }: Props) => {
  const [form] = Form.useForm();
  const { id: regulatorId }: any = React.useContext(userInfoContext);
  const [isFiledTouched, setIsFiledTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onFinish = async (values: any) => {
    const FinalData = { ...values, regulatorId, walletReference: "walletReference" }
    const result = await post(addCompanyUrl, FinalData)
    await mutate(companiesUrl);
    if (result.status !== undefined) {
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
        layout="horizontal"
        onFieldsChange={() => setIsFiledTouched(true)}
      >
        <Form.Item label="Amount" name="amount" required>
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="to company" name="toCompanyId" required>
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="supply chain" name="supplyChainId" required>
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} className="ml-2" />
        </Form.Item>
        <div className="mt-10 flex w-full flex-row-reverse">
          <Button htmlType="submit" className="ml-2 bg-blue text-white hover:bg-blue-dark hover:!text-white" disabled={!isFiledTouched}>
            Add
          </Button>
          <Button htmlType="button" onClick={() => closeModal()}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default AddOrderForm