// @ts-nocheck

import React from 'react';
import { Avatar, Button, Card, DatePickerProps, Input, Select, Row, Col, Badge } from 'antd';
import useSWR from 'swr';
import nextRouter, { useRouter } from 'next/router';
import { companiesUrl } from '../../services/apiEndpoint';
import { fetcher } from '../../services/axios';
import { useState } from 'react';
import { PlusOutlined, UploadOutlined, EyeOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import toPersianNumbers from '../../utils/toPersianDigits'
const { Meta } = Card;

const ScfPrograms = () => {
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
          <Button className='bg-primary-500 text-white ml-3 hover:!text-white' icon={<PlusOutlined />} size="large" onClick={() => nextRouter.push(`/scf-programs/new-scf-program`)}>
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
            <Badge.Ribbon text="فعال" color="#3DA172">
              <Card
                actions={[
                  <EditOutlined 
                    key="edit" 
                    style={{ fontSize: '22px'}} 
                    onClick={() => nextRouter.push(`/scf-programs/edit-scf-program/111`)}
                  />,
                  <EyeOutlined 
                    key="details" 
                    style={{ fontSize: '22px'}}
                    onClick={() => nextRouter.push(`/scf-programs/details-scf-program/111`)}
                  />,
                ]}
              >
                <p className='mb-3 font-bold text-base'>برنامه تامین مالی میدکو</p>
                <p className='my-2'>ابزار مالی یه چیزی</p>
                <p className='my-2'>متد برنامه</p>
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
      </div>
    </>
  )
};

ScfPrograms.layout = 'admin'

export default ScfPrograms

