import { Button, DatePicker, DatePickerProps, Input, Select, Space, Table, Tag } from 'antd';
import useSWR, { mutate } from 'swr';
import nextRouter from 'next/router';
import { InvoicesMyCompanyUrl, UpdateInvoiceUrl } from '../../../services/apiEndpoint';
import { fetcher, patch } from '../../../services/axios';
import { useContext, useState } from 'react';
import React from 'react';
import dateFormat from '../../../utils/dateFormat';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { UserInfoContext } from '../../../components/providers';

const renderStatus = (status: Number) => {
  switch (status) {
    case 1:
      return <Tag color="red">رد شده</Tag>;
    case 0:
      return <Tag color="green">پذیرفته شده</Tag>;
    case 2:
      return <Tag color="gold">در اننتظار تایید</Tag>;
  }
}

const columns = (searchTerm: string, id: any, handleAccepte:Function, handleReject:Function) => ([
  {
    title: 'شماره پیش فاکتور',
    dataIndex: 'id',
    key: 'id',
    // render: (record: any) => (
    //   <div className="text-right">{record.id}</div>
    // ),
  },
  {
    title: 'از شرکت',
    dataIndex: 'sourceCompany',
    key: 'sourceCompany',
    render: (record: any) => (
      <div className="text-right">{record.name}</div>
    ),
  },
  {
    title: 'به شرکت',
    dataIndex: 'destinationCompany',
    key: 'destinationCompany',
    render: (record: any) => (
      <div className="text-right">{record.name}</div>
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
    title: 'مقدار',
    dataIndex: 'value',
    key: 'value',
    with: 50,
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
    title: 'توضیحات',
    dataIndex: 'invoiceDescribtion',
    key: 'invoiceDescribtion',
  },
  {
    title: 'وضعیت',
    dataIndex: 'invoiceStatus',
    render: (record: Number) => (
      renderStatus(record)
    )
  },
  {
    title: "عملیات",
    key: "action",
    render: (_: any, record: any) => (
      record.destinationCompany.id == id
        ? <Space size="middle">
          <Button className="bg-green-300 text-white hover:!text-white text-base" onClick={() => handleAccepte(record.id)}>پذیرفتن</Button>
          <Button onClick={() => handleReject(record.id)} className="bg-red-300 text-white hover:!text-white text-base">ردکردن</Button>
        </Space>
        : null
    )
  }
]);

const Request = () => {
  const { userInfo } = useContext(UserInfoContext);
  const idItem = typeof window !== "undefined" ? localStorage.getItem('id') : null;
  const id = idItem ? window.JSON.parse(idItem): null;

  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(InvoicesMyCompanyUrl, fetcher)

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleAccepte = async (Id:string) => {
    const result = await patch(`${UpdateInvoiceUrl}${Id}`, 0);
    await mutate(InvoicesMyCompanyUrl);
    if (result.success) {
      const finalData = { 
        invoiceId: "string",
        destinationCompanyId: "string",
        supplychain: "string",
        value: 0,
        productCategoryId: "string",
        productDescription: "string",
        productAmount: 0
      }

      // const result = await post(registerCompanyUrl, finalData);
      // if (result.status) {
      //   await mutate(companiesUrl);
      //   router.push(`/companies`);
      // }
    }
  };

  const handleReject = async (Id:string) => {
    const result = await patch(`${UpdateInvoiceUrl}${Id}`, 1);
    await mutate(InvoicesMyCompanyUrl);
    if (result.success) { }
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
      <div className='action-box'>
        <Button className='bg-primary-500 text-white ml-3 hover:!text-white' icon={<PlusOutlined />} size="large" onClick={() => nextRouter.push(`/company/requests/new-request`)}>
          افزودن پیش فاکتور
        </Button>
        <Button className='bg-primary-100 text-primary-500' icon={<UploadOutlined />} size="large">
          خروجی
        </Button>
      </div>
      <Table columns={columns(searchTerm, id, handleAccepte, handleReject)} dataSource={data?.data} scroll={{ y: 450 }} />
    </>
  )
};

Request.layout = 'admin'

export default Request




