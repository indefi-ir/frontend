import { Button, Form, Input, notification, Select, SelectProps } from "antd";
import React from "react";
import { useState } from "react";
import { mutate } from "swr";
import useSWR from 'swr';
import { addSupplyChainUrl, companiesUrl, supplyChainsUrl } from "../../../services/apiEndpoint";
import { fetcher, post } from "../../../services/axios";
import { userInfoContext } from "../../providers/userInfoProvider/UserInfoProvider";
const { TextArea } = Input;

interface Props {
  closeModal: () => void;
}

const AddSupplyChainForm = ({ closeModal }: Props) => {
  const [form] = Form.useForm();
  const { id: regulatorId }: any = React.useContext(userInfoContext);
  const [isFiledTouched, setIsFiledTouched] = useState<boolean>();
  const [api, contextHolder] = notification.useNotification();
  const { data: companies } = useSWR(companiesUrl, fetcher);

  const options: SelectProps['options'] = [];
  companies?.data?.map((company: { id: any; name: any; }) => (
    options.push({
      value: company.id,
      label: company.name,
    })
  ));
  const onFinish = async (values: any) => {
    const FinalData = { ...values, regulatorId }
    const result = await post(addSupplyChainUrl, FinalData)
    await mutate(supplyChainsUrl);

    if (result === '') {
      form.resetFields();
      closeModal();
      api.open({
        message: 'The chain was successfully created.',
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
      <div className="mt-10">
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          onFieldsChange={() => setIsFiledTouched(true)}
          layout="horizontal">
          <Form.Item label="Name" name="name" required>
            <Input className="ml-2" />
          </Form.Item>
          <Form.Item label="Companies" name="companies" required>
            <Select
              mode="tags"
              size='middle'
              style={{ width: '100%' }}
              options={options}
              className="ml-2"
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} className="ml-2" />
          </Form.Item>
          <div className="mt-10 flex w-full flex-row-reverse">
            <Button htmlType="submit" className="ml-2 bg-blue text-white hover:bg-blue-dark hover:!text-white">
              Add
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
export default AddSupplyChainForm

