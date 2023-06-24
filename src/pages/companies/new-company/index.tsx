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
  Switch,
  TreeSelect,
  // Upload,
} from 'antd';

import React, { useState } from 'react';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

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
  return (
    <Card>
      <Form layout="vertical">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' label="نام شرکت">
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' label="نام مدیرعامل">
            <Input />
          </Form.Item>
        </div>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' label="ایمیل">
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' label="شماره تماس">
            <Input />
          </Form.Item>
        </div>
        <div className='flex gap-6'>
          <Form.Item className='flex-1' label="شناسه ملی شرکت">
            <Input />
          </Form.Item>
          <Form.Item className='flex-1' label="شماره مشتری">
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="آدرس">
          <TextArea rows={4} />
        </Form.Item>

        <div className='flex gap-6 items-center'>
          <Form.Item label="محصولات" className='flex-1'>
            <Select>
              <Select.Option value="demo"></Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className='flex-1'>
            <Button className='mt-6'>افزودن محصول جدید</Button>
          </Form.Item>
        </div>
        <Form.Item className='flex justify-end'>
          <Button>افزودن شرکت</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

NewCompany.layout = 'admin';
export default NewCompany;