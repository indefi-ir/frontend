import React, { useState } from "react";
import { Button, DatePicker, Form, Input, notification, Select, SelectProps } from "antd";
import useSWR, { mutate } from 'swr';
import { addFinancialInstrumentsUrl, companiesUrl, getAllSupplyChainsUrl } from "../../services/apiEndpoint";
import { fetcher, post } from "../../services/axios";
import { useRouter } from "next/router";

const { TextArea } = Input;

const AddCreditCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { Id } = router.query;
  const { data: supplyChains } = useSWR(getAllSupplyChainsUrl, fetcher);
  const [api, contextHolder] = notification.useNotification();

  const options: SelectProps['options'] = [];
  supplyChains?.data?.map((supplyChain: { id: string; name: string; }) => (
    options.push({
      value: supplyChain.id,
      label: supplyChain.name,
    })
  ));

  const onFinish = async (values: any) => {
    setLoading(true)
    const finalData = { companyId: Id, supplyChainId: values.supplyChainId, financialInstrumentDto: { value: values.value, bill: { ...values, billStatus: 0 } } };
    delete finalData.financialInstrumentDto.bill.supplyChainId;
    delete finalData.financialInstrumentDto.bill.companyId;
    delete finalData.financialInstrumentDto.bill.value;

    const result = await post(addFinancialInstrumentsUrl, finalData);
    if (result.status) {
      api["success"]({
        message: <span className='text-sm text-green-500'>اعتبار به شرکت مورد نظر انتقال یافت.</span>,
        duration: 2,
      });
      await mutate(companiesUrl);
      router.push(`/companies`);
    } else {
      api["error"]({
        message: <span className='text-sm text-red-500'>{result.response.data}</span>,
        duration: 2,
      });
    }
    setLoading(false)
  };

  return (
    <>
      {contextHolder}
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
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button htmlType="submit" loading={loading} className="bg-pasargad-yellow-400 text-white hover:!text-white h-[50px] text-base">
            افزودن اعتبار
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddCreditCompany;