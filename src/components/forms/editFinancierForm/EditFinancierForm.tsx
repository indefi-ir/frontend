import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { mutate } from "swr";
import { companiesUrl, editCompanyUrl, editFinancierUrl, financiersUrl } from "../../../services/apiEndpoint";
import { post } from "../../../services/axios";
import SetPasswordModal from "../../modals/setPasswordModal/SetPasswordModal";
import { userInfoContext } from "../../providers/userInfoProvider/UserInfoProvider";

interface Props {
  closeModal: () => void;
  companyInfo: any;
}

const EditFinancierForm = ({ closeModal, companyInfo }: Props) => {
  const [form] = Form.useForm();
  const { id: regulatorId }: any = React.useContext(userInfoContext);
  const [error, setError] = useState<string>("");
  const { id, name: companyName } = companyInfo?.companyInfo;

  const onFinish = async (values: any) => {
    const FinalData = { ...values, id }
    const result = await post(editFinancierUrl, FinalData)
    await mutate(`${financiersUrl}${regulatorId}`);
    if (result.status === undefined) {
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
        initialValues={{ name: companyName }}
      >
        <Form.Item label="Name" name="name" >
          <Input className="ml-2" />
        </Form.Item>
        <div className="ml-4">
          <SetPasswordModal userId={id}/>
        </div>
        <div className="mt-10 flex w-full flex-row-reverse">
          <Button htmlType="submit" className="ml-2 bg-blue text-white hover:bg-blue-dark hover:!text-white">
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
export default EditFinancierForm;