import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Table } from 'antd';
import useSWR from 'swr';
import { companiesUrl } from '../../services/apiEndpoint';
import { AddCompanyModal, DeleteCompanyModal, EditCompanyModal } from '../../components/modals';
import { fetcher } from '../../services/axios';
import { useState } from 'react';
import { userInfoContext } from '../../components/providers/userInfoProvider/UserInfoProvider';
import React from 'react';

interface DataType {
  id: React.Key;
  name: string;
  email: string;
}

const columns = (searchTerm: string) => ([
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    filteredValue: [searchTerm],
    onFilter: (value: any, record: { name: string | any[]; }) => {
      return record.name.includes(value)
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: '',
    key: 'action',
    render: (record: { id: string; }) => (
      <Space size="middle">
        <EditCompanyModal companyInfo={record}/>
        <DeleteCompanyModal companyId={record.id} />
      </Space>
    )
  }
]);

const Companies = () => {
  const userInfo = React.useContext(userInfoContext);
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(companiesUrl, fetcher)

  return (
    <div className='border rounded-lg p-5'>
      <div className='flex justify-between mb-10'>
        <Input
          prefix={<SearchOutlined className='mr-2 font-bold text-lg' />}
          placeholder="Search Supply Chains"
          bordered={false}
          className='w-[300px] text-[14px] h-12 border-none !bg-neutral-100 font-normal'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddCompanyModal />
      </div>
      <Table columns={columns(searchTerm)} dataSource={data?.data} scroll={{ y: 450 }} />
    </div>
  )
};

Companies.layout = 'admin'

export default Companies

