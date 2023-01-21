import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Space, Table } from 'antd';
import { fetcher } from '../../services/axios';
import useSWR from 'swr';
import type { ColumnsType } from 'antd/es/table';
import { financiersUrl } from '../../services/apiEndpoint';
import { useState } from 'react';
import { AddFinanciersModal, DeleteFinanciersModal, EditFinanciersModal } from '../../components/modals';

interface DataType {
  id: React.Key;
  name: string;
  description: string;
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
    title: 'ٍEmail',
    dataIndex: 'email',
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Space size="middle">
        <EditFinanciersModal />
        <DeleteFinanciersModal />
      </Space>
    )
  }
]);

const data: DataType[] = []

const Financiers = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(financiersUrl, fetcher)

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
        <AddFinanciersModal />
      </div>
      <Table columns={columns(searchTerm)} dataSource={data?.data} scroll={{ y: 450 }} />
      {/* <div className="flex justify-end mt-5">
      <Pagination defaultCurrent={6} total={10} pageSize={6}/>
    </div> */}
    </div>
  )
};

Financiers.layout = 'admin'

export default Financiers