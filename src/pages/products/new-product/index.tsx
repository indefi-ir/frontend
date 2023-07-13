import { } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  notification,
} from 'antd';

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { addProductCategoryUrl, productCategoriesUrl } from '../../../services/apiEndpoint';
import { post } from '../../../services/axios';
import { useRouter } from 'next/router';


const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    const finalData = { ...values }
    const result = await post(addProductCategoryUrl, finalData.name);
    if (result.status) {
      api["success"]({
        message: <span className='text-sm text-green-500'>شرکت مورد نظر با موفقیت افزوده شد.</span>,
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
            <Form.Item className='flex-1' name="name" label="نام دسته بندی محصول">
              <Input />
            </Form.Item>
          </div>
          <Form.Item className='flex justify-end'>
            <Button htmlType="submit" loading={loading} className="w-full bg-pasargad-yellow-400 text-white hover:!text-white h-[50px] text-base">افزودن دسته بندی</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

NewProduct.layout = 'admin';
export default NewProduct;

