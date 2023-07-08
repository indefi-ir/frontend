import { } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  SelectProps,
  Switch,
  TreeSelect,
  // Upload,
} from 'antd';

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { addProductCategoryUrl, productCategoriesUrl } from '../../../services/apiEndpoint';
import { post } from '../../../services/axios';
import { useRouter } from 'next/router';


const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    const finalData = { ...values }
    const result = await post(addProductCategoryUrl, finalData.name);
    if (result.status) {
      await mutate(productCategoriesUrl);
      router.push(`/products`);
    }
    setLoading(false);
  }

  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish}>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' name="name" label="نام دسته بندی محصول">
            <Input />
          </Form.Item>
        </div>
        <Form.Item className='flex justify-end'>
          <Button htmlType="submit" loading={loading} className="w-full bg-pasargad-yellow-400 text-white hover:!text-white h-[50px] text-base">افزودن دسته بندی</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

NewProduct.layout = 'admin';
export default NewProduct;

