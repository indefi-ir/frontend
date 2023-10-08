import React from 'react';
import { Avatar, Button, Card, Tooltip, DatePickerProps, Input, Select, Space, Table, Tag } from 'antd';
import useSWR from 'swr';
import nextRouter, { useRouter } from 'next/router';
import { companiesUrl } from '../../../services/apiEndpoint';
import { fetcher } from '../../../services/axios';
import { useState } from 'react';
import dateFormat from '../../../utils/dateFormat';
import { CompanyIcon, CreditIcon, EyeIcon } from '../../../components/icons';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import toPersianNumbers from '../../../utils/toPersianDigits'
const { Meta } = Card;

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
    dataIndex: 'name',
    key: 'name',
    filteredValue: [searchTerm],
    onFilter: (value: any, record: { name: string | any[]; }) => {
      return record.name.includes(value)
    },
    render: (_: any, record: { name: string | any; email: string | any }) => (
      <Card bordered={false}>
        <Meta
          avatar={<Avatar size={64} src={ "/images/logo-alternative.png"} />}
          title={record.name}
          description={record.email}
        />
      </Card>
    )
  },
  {
    title: 'شناسه ملی شرکت',
    dataIndex: 'nationalID',
    key: 'nationalID',
    render: (record: string) => (
      <div style={{ direction: "ltr" }} className="text-right">{toPersianNumbers(record)}</div>
    )
  },
  {
    title: 'تلفن',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (record: string) => (
      <div style={{ direction: "ltr" }} className="text-right">{toPersianNumbers(record)}</div>
    )
  },
  {
    title: 'وضعیت',
    dataIndex: 'companyStatus',
    render: (record: Number) => (
      renderStatus(record)
    )
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'creationDate',
    key: 'creationDate',
    render: (record: string) => (
      toPersianNumbers(dateFormat(record))
    ),
  },
  {
    title: "عملیات",
    key: "action",
    render: (_: any, record: any) => (
      <Space size="middle">
        <Tooltip placement="top" color="#7D7AED" title="مشاهده جزییات شرکت">
          <span className='cursor-pointer' onClick={() => nextRouter.push(`/companies/details/${record.id}`)}>
            <EyeIcon />
          </span>
        </Tooltip>
        <Tooltip placement="top" color="#7D7AED" title="افزودن اعتبار">
        <span className='cursor-pointer' onClick={() => nextRouter.push(`/sales-accounting/new-ie-invoice/111`)}>
          <CreditIcon />
        </span>
        </Tooltip>
      </Space>
    )
  }
]);

const SalesAccounting = () => {
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
            placeholder="نام شرکت"
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
      {/* <Table locale={{ emptyText: "داده ای برای نمایش وجود ندارد." }} columns={columns(searchTerm)} dataSource={data?.data}  /> */}
    </>
  )
};

SalesAccounting.layout = 'admin'

export default SalesAccounting




