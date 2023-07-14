import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Empty,
  Form,
  Input,
  notification,
  Select,
  SelectProps,
  Space,
} from 'antd';

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { addProductCategoryUrl, productCategoriesUrl, productUnitsUrl } from '../../../services/apiEndpoint';
import { fetcher, post } from '../../../services/axios';
import { useRouter } from 'next/router';
import { AddProductUnitModal } from '../../../components/modals';


const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const { data: productUnits } = useSWR(productUnitsUrl, fetcher);

  const unitOptions: SelectProps['options'] = [];
  productUnits?.data?.map((unit: { id: any; name: any; }) => (
    unitOptions.push({
      value: unit.id,
      label: unit.name,
    })
  ));

  const onFinish = async (values: any) => {
    setLoading(true);
    const finalData = { ...values }
    const result = await post(addProductCategoryUrl, finalData);
    if (result.status) {
      api["success"]({
        message: <span className='text-sm text-green-500'>محصول مورد نظر با موفقیت افزوده شد.</span>,
        duration: 2,
      });
      await mutate(productCategoriesUrl);
      router.push(`/products`);
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
            <Form.Item className='flex-1' name="name" label="نام محصول">
              <Input />
            </Form.Item>
          </div>
          <div className='flex gap-6'>
            <Form.Item className='flex-1' name="unitIds" label="واحد اندازه گیری">
              <Select
                mode="multiple"
                allowClear
                placeholder="لطفا واحدهای اندازه گیری را انتخاب نمایید."
                options={unitOptions}
                notFoundContent={<Empty description="واحدی یافت نشد." />}
              />
            </Form.Item>
            <div className='mt-6'>
              <AddProductUnitModal />
            </div>
          </div>
          <Form.Item className='flex justify-end'>
            <Button htmlType="submit" loading={loading} className="w-full bg-pasargad-yellow-400 text-white hover:!text-white h-[50px] text-base mt-10">افزودن دسته بندی</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

NewProduct.layout = 'admin';
export default NewProduct;

