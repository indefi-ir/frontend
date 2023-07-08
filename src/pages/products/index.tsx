import { Button, DatePicker, DatePickerProps, Input, Select, Space, Table, Tag } from 'antd';
import useSWR, { mutate } from 'swr';
import nextRouter from 'next/router';
import { productCategoriesUrl } from '../../services/apiEndpoint';
import { fetcher, patch } from '../../services/axios';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import dateFormat from '../../utils/dateFormat';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import toPersianDigits from '../../utils/toPersianDigits';


const columns = (searchTerm: string) => ([
  {
    title: 'نام دسته بندی محصول',
    dataIndex: 'name',
    key: 'name',
    render: (record: any) => (
      <div>{record}</div>
    )
  },
]);

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(productCategoriesUrl, fetcher)

  return (
    <>
      <div className='flex justify-between mb-10'>
        <div className='search-box'>
          <Input
            placeholder="نام محصول"
            className='font-normal !bg-white w-60 p-2 ml-3'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='action-box'>
          <Button className='bg-pasargad-yellow-400 text-white ml-3 hover:!text-white' icon={<PlusOutlined />} size="large" onClick={() => nextRouter.push(`/products/new-product/`)}>
            افزودن دسته بندی محصول
          </Button>
          <Button className='bg-white border-pasargad-yellow-400 text-pasargad-yellow-400' icon={<UploadOutlined />} size="large">
            خروجی
          </Button>
        </div>
      </div>
      <Table locale={{emptyText:"داده ای برای نمایش وجود ندارد."}} columns={columns(searchTerm)} dataSource={data?.data} scroll={{ y: 450 }} />
    </>
  )
};

Products.layout = 'admin'

export default Products




