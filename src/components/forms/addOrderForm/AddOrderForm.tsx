import { Button, Form, Input, Select, SelectProps } from "antd";
import React, { useState } from "react";
import useSWR from 'swr';
import { mutate } from "swr";
import { addOrdersUrl, availableOrdersUrl, ordersUrl } from "../../../services/apiEndpoint";
import { fetcher, post } from "../../../services/axios";
const { TextArea } = Input;

interface Props {
  closeModal: () => void;
}

const AddOrderForm = ({ closeModal }: Props) => {
  const [form] = Form.useForm();
  const [isFiledTouched, setIsFiledTouched] = useState<boolean>(false);
  const { data: availableSellers } = useSWR(availableOrdersUrl, fetcher)
  const [error, setError] = useState<string>("");

  const companies: SelectProps['options'] = [];
  const chains: SelectProps['options'] = [];

  availableSellers?.data?.map((availableSeller: { companyId: string; companyName: string; chainId: string; chainName: string;}) => (
    companies.push({
      value: availableSeller.companyId,
      label: availableSeller.companyName,
    }),
    chains.push({
      value: availableSeller.chainId,
      label: availableSeller.chainName,
    })
  ));

  const onFinish = async (values: any) => {
    const FinalData = { ...values }
    const result = await post(addOrdersUrl, FinalData)
    await mutate(ordersUrl);
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
        onFieldsChange={() => setIsFiledTouched(true)}
      >
        <Form.Item label="Amount" name="amount" required>
          <Input className="ml-2" />
        </Form.Item>
        <Form.Item label="To Company" name="toCompanyId" required>
          <Select
            size='middle'
            style={{ width: '100%' }}
            options={companies}
            className="ml-2"
          />
        </Form.Item>
        <Form.Item label="from chain" name="supplyChainId" required>
          <Select
            size='middle'
            style={{ width: '100%' }}
            options={chains}
            className="ml-2"
          />
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

