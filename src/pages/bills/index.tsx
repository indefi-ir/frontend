import { Button, DatePicker, DatePickerProps, Input, Select, Space, Table, Tag } from 'antd';
import useSWR, { mutate } from 'swr';
import nextRouter from 'next/router';
import { transactionsUrl } from '../../services/apiEndpoint';
import { fetcher, patch } from '../../services/axios';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import dateFormat from '../../utils/dateFormat';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';


const columns = (searchTerm: string) => ([
  {
    title: 'شماره صورتحساب ',
    dataIndex: 'txId',
    key: 'txId',
  },
  {
    title: 'از شرکت',
    dataIndex: 'from',
    key: 'from',
    render: (record: any) => (
      <div className="text-right">{record?.name}</div>
    ),
  },
  {
    title: 'به شرکت',
    dataIndex: 'to',
    key: 'to',
    render: (record: any) => (
      <div className="text-right">{record?.name}</div>
    ),
  },
  {
    title: 'محصول',
    dataIndex: 'productCategory',
    key: 'productCategory',
    render: (record: any) => (
      <div className="text-right">{record.name}</div>
    ),
  },
  {
    title: 'مقدار محصول',
    dataIndex: 'productAmount',
    key: 'productAmount',
  },
  {
    title: 'میزان اعتبار',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'date',
    key: 'date',
    render: (record: string) => (
      dateFormat(record)
    ),
  },
]);

const Bills = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(transactionsUrl, fetcher)

  return (
    <>
      <div className='flex justify-between mb-10'>
        <div className='search-box'>
          <Input
            placeholder="نام شرکت"
            className='font-normal !bg-white w-60 p-2 ml-3'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DatePicker placeholder="تاریخ ایجاد" className='ml-3' />
          <Select
            defaultValue="فعال"
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
          <Button className='bg-pasargad-yellow-400 text-white ml-3 hover:!text-white' icon={<PlusOutlined />} size="large" onClick={() => nextRouter.push(`/company/requests/new-request`)}>
            افزودن پیش فاکتور
          </Button>
          <Button className='bg-white border-pasargad-yellow-400 text-pasargad-yellow-400' icon={<UploadOutlined />} size="large">
            خروجی
          </Button>
        </div>
      </div>
      <Table columns={columns(searchTerm)} dataSource={data?.data} scroll={{ y: 450 }} />
    </>

  )
};

Bills.layout = 'admin'

export default Bills




