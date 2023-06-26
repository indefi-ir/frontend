import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, DatePicker, Button, Card, Col, Form, Input, List, Row, Select, Space } from 'antd';
import CompanyInfo from '../../../features/company-information/CompanyInfo';

const { Option } = Select;
const { TextArea } = Input;

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};

const data = [
  {
    title: 'شناسه ملی شرکت',
  },
  {
    title: 'شماره تلفن',
  },
  {
    title: 'آدرس پستی',
  },
];

type SightsKeys = keyof typeof sights;

const CreditCompany = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <CompanyInfo />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item name="area" label="نام زنجیره" rules={[{ required: true, message: 'وارد کردن نام زنجیره الزامی است.' }]}>
              <Select options={areas} onChange={handleChange} />
            </Form.Item>
            <Form.Item name="" label="حد اعتبار">
              <Input />
            </Form.Item>
            <Form.Item name="" label="تاریخ شروع ">
              <Input />
            </Form.Item>
            <Form.Item name="" label="تاریخ پایان ">
              <Input />
            </Form.Item>
            <Form.List name="instruments">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            label="نوع اعتبار"
                            name={[field.name, 'sight']}
                            rules={[{ required: true, message: 'Missing sight' }]}
                          >
                            <Select disabled={!form.getFieldValue('area')} style={{ width: 130 }}>
                              {(sights[form.getFieldValue('area') as SightsKeys] || []).map((item) => (
                                <Option key={item} value={item}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="مقدار"
                        name={[field.name, 'price']}
                        rules={[{ required: true, message: 'وارد کردن مقدار اعتیار الزامی است.' }]}
                      >
                        <Input />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      افزودن
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">
                ثبت
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          Card content
        </Card>
      </Col>
    </Row>
  )
}
CreditCompany.layout = 'admin';
export default CreditCompany