import React from 'react';
import { Avatar, Button, Card, DatePicker, DatePickerProps, Input, Select, Space, Table, Tag } from 'antd';
import useSWR from 'swr';
import nextRouter, { useRouter } from 'next/router';
import { getAllSupplyChainsUrl } from '../../services/apiEndpoint';
import { fetcher } from '../../services/axios';
import { useState } from 'react';
import dateFormat from '../../utils/dateFormat';

import { CreditIcon, EyeIcon } from '../../components/icons';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import toPersianDigits from '../../utils/toPersianDigits';
const { Meta } = Card;

const columns = (searchTerm: string) => ([
  {
    title: 'نام زنجیره',
    dataIndex: 'name',
    key: 'name',
    filteredValue: [searchTerm],
    onFilter: (value: any, record: { name: string | any[]; }) => {
      return record.name.includes(value)
    }
  },
  {
    title: 'اعتبار ',
    dataIndex: 'credit',
    key: 'credit',
    render: (record: number) => (
      <div style={{ direction: "ltr" }} className="text-right">{toPersianDigits (record.toLocaleString())}</div>
    )
  },
  {
    title: 'توضیحات ',
    dataIndex: 'description',
    key: 'description',
    render: (record: number) => (
      <div className='truncate w-[200px]'>{record}</div>
    )
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'creationDate',
    key: 'creationDate',
    render: (record: string) => (
      toPersianDigits(dateFormat(record))
    ),
  },
  {
    title: "عملیات",
    key: "action",
    render: (_: any, record: any) => (
      <Space size="middle">
        <span className='cursor-pointer' onClick={() => nextRouter.push(`/supply-chains/details-chain/${record.id}`)}>
          <EyeIcon />
        </span>
      </Space>
    )
  }
]);

const SupplyChains = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(getAllSupplyChainsUrl, fetcher)
  
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
            placeholder="نام زنجیره"
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
          <Button className='bg-primary-500 text-white hover:!text-white h-[50px] text-base ml-3' icon={<PlusOutlined />} size="large" onClick={() => nextRouter.push(`/supply-chains/new-chain`)}>
            افزودن زنجیره
          </Button>
          <Button className='bg-primary-100 text-primary-500' icon={<UploadOutlined />} size="large">
            خروجی
          </Button>
        </div>
      </div>
      <Table locale={{emptyText:"داده ای برای نمایش وجود ندارد."}} columns={columns(searchTerm)} dataSource={data?.data} />
    </>
  )
};

SupplyChains.layout = 'admin'

export default SupplyChains;

