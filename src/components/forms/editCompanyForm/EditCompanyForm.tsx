import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { mutate } from "swr";
import { companiesUrl, editCompanyUrl } from "../../../services/apiEndpoint";
import { post } from "../../../services/axios";
import SetPasswordModal from "../../modals/setPasswordModal/SetPasswordModal";
import { userInfoContext } from "../../providers/userInfoProvider/UserInfoProvider";

interface Props {
  closeModal: () => void;
  companyInfo: any;
}

const EditCompanyForm = ({ closeModal, companyInfo }: Props) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { id, name: companyName } = companyInfo?.companyInfo;

  const onFinish = async (values: any) => {
    const FinalData = { ...values, id }
    const result = await post(editCompanyUrl, FinalData)
    await mutate(companiesUrl);

    if (result === '') {
      form.resetFields();
      closeModal();
      api.open({
        message: 'The company was successfully edited.',
        duration: 3,
        className: 'success'
      });
    } else {
      form.resetFields();
      api.open({
        message: `${result?.response?.data?.title}`,
        duration: 3,
        className: 'error'
      });
    }
  }

  return (
    <>
      {contextHolder}
      <div className="mt-6">
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
            <SetPasswordModal companyId={id} />
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
    </>
  )
}
export default EditCompanyForm;