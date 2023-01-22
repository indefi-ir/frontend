import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Space, Table } from 'antd';
import useSWR, { Fetcher } from 'swr';
import type { ColumnsType } from 'antd/es/table';
import { companiesUrl } from '../../services/apiEndpoint';
import { AddCompaniesModal, DeleteCompaniesModal, EditCompaniesModal } from '../../components/modals';
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
    render: () => (
      <Space size="middle">
        <EditCompaniesModal />
        <DeleteCompaniesModal />
      </Space>
    )
  }
]);

const Companies = () => {
  const userInfo = React.useContext(userInfoContext); 
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(`${companiesUrl}${userInfo.id}`, fetcher)

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
        <AddCompaniesModal />
      </div>
      <Table columns={columns(searchTerm)} dataSource={data?.data} scroll={{ y: 450 }} />
      {/* <div className="flex justify-end mt-5">
      <Pagination defaultCurrent={6} total={10} pageSize={6}/>
    </div> */}
    </div>
  )
};

Companies.layout = 'admin'

export default Companies

