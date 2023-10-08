import { MinusCircleOutlined } from '@ant-design/icons';
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
  notification,
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
  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();
  const { data: productCategories } = useSWR(productCategoriesUrl, fetcher);

  const options: SelectProps['options'] = [];
  productCategories?.data?.map((product: { id: any; name: any; }) => (
    options.push({
      value: product.id,
      label: product.name,
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
      <div style={{ marginTop: 8 }}>بارگذاری لوگو</div>
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
      api["success"]({
        message: <span className='text-sm text-green-500'>شرکت مورد نظر با موفقیت افزوده شد.</span>,
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
    setLoading(false);
  }

  return (
    <>
      {contextHolder}
      <Form layout="vertical" onFinish={onFinish}>
        <Card title="اطلاعات اولیه کسب و کار" className='mb-4'>
          <div className='flex gap-6'>
            <Form.Item label="شناسه ملی کسب و کار" name="nationalID" className='flex-1'>
              <Input />
            </Form.Item>
            <Form.Item label="شناسه ملی مدیرعامل" name="" className='flex-1'>
              <Input />
            </Form.Item>
          </div>
          <div className='flex gap-6'>
            <Form.Item label="نام مدیرعامل" name="owner" className='flex-1'>
              <Input />
            </Form.Item>
            <Form.Item label="شماره موبایل مدیرعامل" name="" className='flex-1'>
              <Input />
            </Form.Item>
          </div>
        </Card>
        <Card title="اطلاعات بانکی" className='mb-4'>
          <div className='flex gap-6'>
            <Form.Item label="شماره حساب" name="" className='flex-1'>
              <Input />
            </Form.Item>
            <Form.Item label="کد شعبه" name="" className='flex-1'>
              <Input />
            </Form.Item>
          </div>
          <div className='flex gap-6'>
            <Form.Item label="شماره مشتری" name="customerID" className='flex-1'>
              <Input />
            </Form.Item>
            <Form.Item label="شماره شبا" name="iban" className='flex-1'>
              <Input />
            </Form.Item>
          </div>
        </Card>
        <Card title="اطلاعات صاحبین امضا" className='mb-4'>
          <div>
            <Form.List name="fields">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <div key={field.key}>
                        <div className='flex gap-6'>
                          <Form.Item label="شناسه ملی" name="nationalId" className='flex-1'>
                            <Input />
                          </Form.Item>
                          <Form.Item label="شماره موبایل" name="phoneNumber" className='flex-1'>
                            <Input />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </div>

                      </div>
                    ))}
                    <div className='flex justify-end'>
                      <Form.Item>
                        <Button
                          htmlType='submit'
                          className='bg-white text-primary-500 border-dashed border-1 border-primary-500'
                          type="dashed"
                          onClick={() => add()}
                        >
                          <PlusOutlined /> افزودن
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                );
              }}
            </Form.List>
          </div>
        </Card>
        <Card title="سایر اطلاعات" className='mb-4'>
          <div className='flex'>
            <Form.Item>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader mb-8"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
          </div>
          <div className='flex gap-6'>
            <Form.Item label="کد پستی" name="" className='flex-1'>
              <Input />
            </Form.Item>
            <Form.Item label="شماره تلفن" name="phoneNumber" className='flex-1'>
              <Input />
            </Form.Item>
            <Form.Item label="ایمیل" name="email" className='flex-1'>
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
          <div className='flex gap-6'>
            <Form.Item name="address" label="آدرس پستی" className='flex-1'>
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className='flex justify-end'>
            <Form.Item>
              <Button htmlType='submit' className='bg-primary-100 text-primary-500'>
                ذخیره
              </Button>
            </Form.Item>
          </div>
        </Card>
      </Form>
    </>
  )
}

NewCompany.layout = 'admin';
export default NewCompany;

