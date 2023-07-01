import { DatePicker, DatePickerProps, Input, Select, Space, Table, Tag } from 'antd';
import useSWR from 'swr';
import { billsUrl } from '../../services/apiEndpoint';
import { fetcher } from '../../services/axios';
import { useState } from 'react';
import React from 'react';
import dateFormat from '../../utils/dateFormat';

const renderStatus = (status: Number) => {
  switch (status) {
    case 1:
      return <Tag color="green">فعال</Tag>;
    case 0:
      return <Tag color="red">مسدود شده</Tag>;
    case 2:
      return <Tag color="gold">مسدود موقت</Tag>;
  }
}

const columns = (searchTerm: string) => ([
  {
    title: 'نام شرکت',
    dataIndex: 'company',
    key: 'company',
    render: (record: any) => (
      <div className="text-right">{record.name}</div>
    ),
  },
  {
    title: 'تلفن',
    dataIndex: 'company',
    key: 'company',
    render: (record: any) => (
      <div style={{direction: "ltr"}} className="text-right">{record.phoneNumber}</div>
    )
  },
  {
    title: 'مقدار',
    dataIndex: 'value',
    key: 'value',
    render: (record: string) => (
      <div style={{direction: "ltr"}} className="text-right">{record}</div>
    )
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'creationDate',
    key: 'creationDate',
    render: (record: string) => (
      dateFormat(record)
    ),
  },
  {
    title: 'تاریخ سررسید',
    dataIndex: 'due',
    key: 'due',
    render: (record: string) => (
      dateFormat(record)
    ),
  },
  {
    title: 'وضعیت',
    dataIndex: 'billStatus',
    render: (record: Number) => (
      renderStatus(record)
    )
  }
]);

const Bills = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(billsUrl, fetcher)

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div className='flex mb-10'>
        <Input
          placeholder="نام شرکت"
          className='font-normal !bg-white w-60 p-2 ml-3'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DatePicker onChange={onChange} placeholder="تاریخ ایجاد" className='ml-3' />
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
      <Table columns={columns(searchTerm)} dataSource={data?.data} scroll={{ y: 450 }} />
    </>
  )
};

Bills.layout = 'admin'

export default Bills

