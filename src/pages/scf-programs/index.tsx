// @ts-nocheck

import React from 'react';
import { Avatar, Button, Card, Tooltip, DatePickerProps, Input, Select, Space, Table, Tag } from 'antd';
import useSWR from 'swr';
import nextRouter, { useRouter } from 'next/router';
import { companiesUrl } from '../../services/apiEndpoint';
import { fetcher } from '../../services/axios';
import { useState } from 'react';
import { userInfoContext } from '../../components/providers/userInfoProvider/UserInfoProvider';
import dateFormat from '../../utils/dateFormat';
import { CompanyIcon, CreditIcon, EyeIcon } from '../../components/icons';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import toPersianNumbers from '../../utils/toPersianDigits'
const { Meta } = Card;


const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(companiesUrl, fetcher);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div className='flex justify-between mb-10'>
        <div className='search-box'>
          <Input
            placeholder="نام برنامه تامین مالی زنجیره تامین"
            className='font-normal !bg-white w-60 p-2 ml-3'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <DatePicker onChange={onChange} placeholder="تاریخ ایجاد" className='ml-3' /> */}
          <Select
            defaultValue="فعال"
            onChange={handleChange}
            placeholder="وضعیت"
            className='w-40 ml-3'
            options={[
              { value: 1, label: 'فعال' },
              { value: 2, label: 'مسدود موقت' },
              { value: 0, label: 'مسدود شده' }
            ]}
          />
        </div>

        <div className='action-box'>
          <Button className='bg-primary-500 text-white ml-3 hover:!text-white' icon={<PlusOutlined />} size="large" onClick={() => nextRouter.push(`/companies/new-company`)}>
            افزودن
          </Button>
          <Button className='bg-primary-100 text-primary-500' icon={<UploadOutlined />} size="large">
            خروجی
          </Button>
        </div>
      </div>
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card 
              title="Card title" 
              bordered={false}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
};

Companies.layout = 'admin'

export default Companies

