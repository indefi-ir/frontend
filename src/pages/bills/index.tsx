import { DatePicker, DatePickerProps, Input, Select, Space, Table, Tag } from 'antd';
import useSWR from 'swr';
import { companiesUrl } from '../../services/apiEndpoint';
import { fetcher } from '../../services/axios';
import { useState } from 'react';
import { userInfoContext } from '../../components/providers/userInfoProvider/UserInfoProvider';
import React from 'react';
import Link from 'next/link';
import dateFormat from '../../utils/dateFormat';
import { CreditIcon, EyeIcon } from '../../components/icons';


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
    }
  },
  {
    title: 'شناسه ملی شرکت',
    dataIndex: 'nationalID',
    key: 'nationalID',
    filteredValue: [searchTerm],
    onFilter: (value: any, record: { name: string | any[]; }) => {
      return record.name.includes(value)
    }
  },
  {
    title: 'تلفن',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (record: string) => (
      <div style={{direction: "ltr"}} className="text-right">{record}</div>
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
      dateFormat(record)
    ),
  },
  {
    title: "عملیات",
    key: "action",
    render: () => (
      <Space size="middle">
        <Link href="/about">
          <EyeIcon />
        </Link>
        <Link href="/about">
          <CreditIcon />
        </Link>
      </Space>
    )
  }
]);

const Bills = () => {
  const userInfo = React.useContext(userInfoContext);
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(companiesUrl, fetcher)

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

