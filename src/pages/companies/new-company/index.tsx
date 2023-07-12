import { } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Empty,
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
const { RangePicker } = DatePicker;
const { TextArea } = Input;

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { companiesUrl, productCategoriesUrl, registerCompanyUrl } from '../../../services/apiEndpoint';
import { fetcher, post } from '../../../services/axios';
import { useRouter } from 'next/router';
import toEnglishDigits from '../../../utils/toEnglishDigits';

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
  const router = useRouter();
  const { data: productCategories } = useSWR(productCategoriesUrl, fetcher);

  const options: SelectProps['options'] = [];
  productCategories?.data?.map((company: { id: any; name: any; }) => (
    options.push({
      value: company.name,
      label: company.name,
    })
  ));

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>بارگذاری</div>
    </div>
  );
  // ts-ignore
  const onFinish = async (values: any) => {
    setLoading(true);
    const finalData = {
      ...values,
      logo: imageUrl,
      phonenumber: toEnglishDigits(values.phonenumber),
      nationalID: toEnglishDigits(values.nationalID),
      customerID: toEnglishDigits(values.customerID),
      shaba: toEnglishDigits(values.shaba),
    }

    delete finalData.confirm;

    const result = await post(registerCompanyUrl, finalData);
    if (result.status) {
      await mutate(companiesUrl);
      router.push(`/companies`);
    }
    setLoading(false);
  }

  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish}>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader mb-8"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} /> : uploadButton}
        </Upload>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' name="name" label="نام شرکت" required>
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' name="owner" label="نام مدیرعامل" required>
            <Input />
          </Form.Item>
        </div>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' name="email" label="ایمیل" required>
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' name="phonenumber" label="شماره تماس" required>
            <Input />
          </Form.Item>
        </div>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' name="nationalID" label="شناسه ملی شرکت" required>
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' name="customerID" label="شماره مشتری" required>
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' name="shaba" label="شماره شبا" required>
            <Input />
          </Form.Item>
        </div>
        <div className='flex gap-6'>
          <Form.Item
            name="password"
            label="کلمه عبور"
            required
            hasFeedback
            className='flex-1'
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="تایید کلمه عبور"
            dependencies={['password']}
            hasFeedback
            className='flex-1'
            rules={[
              {
                required: true,
                message: 'لطفا تکرار پسورد را وارد نمایید.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('تکرار پسورد مطابقت ندارد.'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className='flex-1 gap-6 items-center'>
          <Form.Item label="محصولات" name="productCategories" required>
            <Select
              mode="multiple"
              allowClear
              placeholder="لطفا محصولات مورد نظر را انتخاب کنید."
              options={options}
              notFoundContent={<Empty description="محصولی یافت نشد."/>}
            />
          </Form.Item>
        </div>
        <Form.Item name="address" label="آدرس پستی" required>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item className='flex justify-end'>
          <Button htmlType="submit" loading={loading} className="w-full bg-pasargad-yellow-400 text-white hover:!text-white h-[50px] text-base">افزودن شرکت</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

NewCompany.layout = 'admin';
export default NewCompany;

