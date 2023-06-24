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

import React, { useState } from 'react';
import useSWR from 'swr';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { productCategoriesUrl, registerCompanyUrl } from '../../../services/apiEndpoint';
import { fetcher, post } from '../../../services/axios';

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

const NewCompany = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { data: productCategories } = useSWR(productCategoriesUrl, fetcher);

  const options: SelectProps['options'] = [];
  productCategories?.data?.map((company: { id: any; name: any; }) => (
    options.push({
      value: company.id,
      label: company.name,
    })
  ));

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values) => {
    const finalData = { ...values }
    const result = await post(registerCompanyUrl, finalData);
    // await mutate(companiesUrl);
    if (result.success) {

    }
  }

  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish}>
        {/* <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload> */}
        <Form.Item className='flex-1' name="logo" label="logo">
          <Input />
        </Form.Item>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' name="name" label="نام شرکت">
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' name="owner" label="نام مدیرعامل">
            <Input />
          </Form.Item>
        </div>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' name="email" label="ایمیل">
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' name="phonenumber" label="شماره تماس">
            <Input />
          </Form.Item>
        </div>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' name="nationalID" label="شناسه ملی شرکت">
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' name="customerID" label="شماره مشتری">
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' name="password" label="پسورد">
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="address" label="آدرس">
          <TextArea rows={4} />
        </Form.Item>

        <div className='flex-1 gap-6 items-center'>
          <Form.Item label="محصولات" name="productCategories" required>
            <Select
              mode="multiple"
              allowClear
              placeholder="لطفا محصولات مورد نظر را انتخاب کنید."
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
        </div>
        <Form.Item className='flex justify-end'>
          <Button htmlType="submit">افزودن شرکت</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

NewCompany.layout = 'admin';
export default NewCompany;

