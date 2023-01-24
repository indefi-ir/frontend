import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { mutate } from "swr";
import { companiesUrl, setPasswordCompanyUrl } from "../../../services/apiEndpoint";
import { post } from "../../../services/axios";
import { userInfoContext } from "../../providers/userInfoProvider/UserInfoProvider";

interface Props {
  closeModal: () => void;
  id: string;
}

const SetPasswordForm = ({ closeModal, id }: Props) => {
  const [form] = Form.useForm();
  const { id: regulatorId }: any = React.useContext(userInfoContext);
  const [isFiledTouched, setIsFiledTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onFinish = async (values: any) => {
    const FinalData = { ...values, id }
    const result = await post(setPasswordCompanyUrl, FinalData)
    await mutate(companiesUrl);
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
        layout="horizontal"
        onFieldsChange={() => setIsFiledTouched(true)}
      >
        <Form.Item label="Password" name="password">
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword">
          <Input className="ml-2" />
        </Form.Item>
        <div className="mt-10 flex w-full flex-row-reverse">
          <Button htmlType="submit" className="ml-2 bg-blue text-white hover:bg-blue-dark hover:!text-white" disabled={!isFiledTouched}>
            Save
          </Button>
          <Button htmlType="button" onClick={() => closeModal()}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default SetPasswordForm