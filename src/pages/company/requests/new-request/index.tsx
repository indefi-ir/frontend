import { } from '@ant-design/icons';
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  notification,
  Select,
  SelectProps,
} from 'antd';

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
const { TextArea } = Input;
import { addNewInvoiceUrl, companiesUrl, getSupplyChainsForMyCompanyUrl, InvoicesMyCompanyUrl, productCategoriesMyCompanyUrl, productUnitsUrl } from '../../../../services/apiEndpoint';
import { fetcher, post } from '../../../../services/axios';
import { useRouter } from 'next/router';
import toEnglishDigits from '../../../../utils/toEnglishDigits';

const NewRequest = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { data: productCategories } = useSWR(productCategoriesMyCompanyUrl, fetcher);
  const { data: companies } = useSWR(companiesUrl, fetcher);
  const { data: supplyChains } = useSWR(getSupplyChainsForMyCompanyUrl, fetcher);
  const { data: productUnits } = useSWR(productUnitsUrl, fetcher);

  const optionsCategories: SelectProps['options'] = [];
  productCategories?.data?.map((category: { id: any; name: any; }) => (
    optionsCategories.push({
      value: category.id,
      label: category.name,
    })
  ));

  const optionsCompanies: SelectProps['options'] = [];
  companies?.data?.map((company: { id: any; name: any; }) => (
    optionsCompanies.push({
      value: company.id,
      label: company.name,
    })
  ));

  const optionsSupplyChains: SelectProps['options'] = [];
  supplyChains?.data?.map((supplyChain: { id: any; name: any; }) => (
    optionsSupplyChains.push({
      value: supplyChain.id,
      label: supplyChain.name,
    })
  ));

  const unitOptions: SelectProps['options'] = [];
  productUnits?.data?.map((unit: { id: any; name: any; }) => (
    unitOptions.push({
      value: unit.id,
      label: unit.name,
    })
  ));

  const onFinish = async (values: any) => {
    setLoading(true);
    const finalData = {
      ...values,
      logo: imageUrl,
      value: toEnglishDigits(values?.value),
      productAmount: toEnglishDigits(values?.productAmount),
    }
    const result = await post(addNewInvoiceUrl, finalData);
    if (result.status) {
      api["success"]({
        message: <span className='text-sm text-green-500'>پیش فاکتور مورد نظر با موفقیت ثبت شد.</span>,
        duration: 2,
      });
      await mutate(InvoicesMyCompanyUrl);
      router.push(`/company/requests`);
    } else {
      api["error"]({
        message: <span className='text-sm text-red-500'>{result.response.data}</span>,
        duration: 2,
      });
    }
    setLoading(false);
  }

  return (
    <>
      {contextHolder}
      <Card>
        <Form layout="vertical" onFinish={onFinish}>
          <div className='flex gap-6'>
            <Form.Item className='flex-1' name="value" label="مبلغ محصول">
              <Input />
            </Form.Item>

            <Form.Item className='flex-1' name="productAmount" label="مقدار محصول">
              <Input />
            </Form.Item>

            <Form.Item className='flex-1' name="ProductUnitId" label="واحد اندازه گیری">
              <Select
                allowClear
                placeholder="لطفا واحدهای اندازه گیری را انتخاب نمایید."
                options={unitOptions}
              />
            </Form.Item>
          </div>
          <div className='flex-1 gap-6 items-center'>
            <Form.Item label="نام زنجیره" name="supplychainId" required>
              <Select
                allowClear
                placeholder="لطفا زنجیره مورد نظر را انتخاب کنید."
                options={optionsSupplyChains}
              />
            </Form.Item>
          </div>
          <div className='flex-1 gap-6 items-center'>
            <Form.Item label="شرکت مقصد" name="destinationCompanyId" required>
              <Select
                allowClear
                placeholder="لطفا شرکت مورد نظر را انتخاب کنید."
                options={optionsCompanies}
              />
            </Form.Item>
          </div>
          <div className='flex-1 gap-6 items-center'>
            <Form.Item label="محصول" name="productCategoryId" required>
              <Select
                allowClear
                placeholder="لطفا محصولات مورد نظر را انتخاب کنید."
                options={optionsCategories}
              />
            </Form.Item>
          </div>
          <Form.Item name="invoiceDescribtion" label="توضیحات پیش فاکتور">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className='flex justify-end'>
            <Button htmlType="submit" loading={loading} className="w-full bg-primary-500 text-white hover:!text-white h-[50px] text-base">افزودن پیش فاکتور</Button>
          </Form.Item>
        </Form>
      </Card>
    </>

  )
}

NewRequest.layout = 'admin';
export default NewRequest;

