import { } from '@ant-design/icons';
import {
  Button,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  SelectProps,
  Switch,
  TreeSelect,
  // Upload,
} from 'antd';

import React, { useContext, useState } from 'react';
import useSWR, { mutate } from 'swr';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { addNewInvoiceUrl, companiesUrl, InvoicesMyCompanyUrl, productCategoriesMyCompanyUrl, productCategoriesUrl, registerCompanyUrl } from '../../../../services/apiEndpoint';
import { fetcher, post } from '../../../../services/axios';
import { useRouter } from 'next/router';
import { UserInfoContext } from '../../../../components/providers';

const options: SelectProps['options'] = [];
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  console.log(reader)
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const NewRequest = () => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const router = useRouter();
  const { data: productCategories } = useSWR(productCategoriesMyCompanyUrl, fetcher);

  

  const { data: companies } = useSWR(companiesUrl, fetcher);
  
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


  const onFinish = async (values: any) => {
    setLoading(true);
    const finalData = { ...values, logo: imageUrl }
    const result = await post(addNewInvoiceUrl, finalData);
    if (result.status) {
      await mutate(InvoicesMyCompanyUrl);
      router.push(`/company/requests`);
    }
    setLoading(false);
  }

  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish}>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' name="value" label="مقدار اعتبار">
            <Input />
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
  )
}

NewRequest.layout = 'admin';
export default NewRequest;

