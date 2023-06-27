import React from "react";
import { Button, DatePicker, Form, Input, Select, SelectProps } from "antd";
import useSWR from 'swr';
import { addFinancialInstrumentsUrl, getAllSupplyChainsUrl } from "../../services/apiEndpoint";
import { fetcher, post } from "../../services/axios";
import { useRouter } from "next/router";

const { TextArea } = Input;

const AddCreditCompany = () => {
  const router = useRouter();
  const { Id } = router.query;

  const { data: supplyChains } = useSWR(getAllSupplyChainsUrl, fetcher);

  const options: SelectProps['options'] = [];
  supplyChains?.data?.map((supplyChain: { id: string; name: string; }) => (
    options.push({
      value: supplyChain.id,
      label: supplyChain.name,
    })
  ));

  const onFinish = async (values: any) => {
    const finalData = { companyId: Id, supplyChainId: values.supplyChainId, financialInstrumentDto: { value: values.value, bill: { ...values, billStatus: 0 } } };
    delete finalData.financialInstrumentDto.bill.supplyChainId;
    delete finalData.financialInstrumentDto.bill.companyId;
    delete finalData.financialInstrumentDto.bill.value;

    const result = await post(addFinancialInstrumentsUrl, finalData);
    if (result.success) {
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item name="supplyChainId" label="نام زنجیره" rules={[{ required: true, message: 'وارد کردن نام زنجیره الزامی است.' }]}>
        <Select options={options} />
      </Form.Item>
      <Form.Item name="value" label="حد اعتبار">
        <Input />
      </Form.Item>
      <Form.Item name="creation" label="تاریخ شروع اعتبار">
        <DatePicker style={{ width: '100%' }} placeholder="انتخاب تاریخ" />
      </Form.Item>
      <Form.Item name="due" label="تاریخ پایان اعتبار" >
        <DatePicker style={{ width: '100%' }} placeholder="انتخاب تاریخ" />
      </Form.Item>
      <Form.Item name="billInfo" label="توضیحات">
        <TextArea rows={4} maxLength={6} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">
          ثبت
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddCreditCompany;