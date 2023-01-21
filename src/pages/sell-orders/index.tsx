import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Space, Table, Tag } from 'antd';
import useSWR from 'swr';
import { fetcher } from '../../services/axios';
import { sellOrdersUrl } from '../../services/apiEndpoint';
import { useState } from 'react';

const columns = (searchTerm: string) => ([
  {
    title: 'id',
    dataIndex: 'id',
    width: 150,
    filteredValue: [searchTerm],
    onFilter: (value: any, record: { OrderId: string | any[]; }) => {
      return record.OrderId.includes(value)
    }
  },
  {
    title: 'from',
    dataIndex: 'fromCompanyName',
    width: 150,
  },
  {
    title: 'to',
    dataIndex: 'toCompanyName',
    width: 150,
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
    width: 150,
  },
  {
    title: 'description',
    dataIndex: 'description',
    width: 150,
  },
  {
    title: 'order state',
    dataIndex: 'orderState',
    width: 150,
  },
  {
    title: '',
    dataIndex: 'allowedActions',
    render: () => (
      <Space size="middle">
        <Tag color="green">accept</Tag>
        <Tag color="red">reject</Tag>
        <Tag color="default">cancel</Tag>
      </Space>
    )
  }
]);

const SellOrders = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(sellOrdersUrl, fetcher)

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
      </div>
      <Table columns={columns(searchTerm)} dataSource={data?.data} scroll={{ y: 450 }} />
      {/* <div className="flex justify-end mt-5">
      <Pagination defaultCurrent={6} total={10} pageSize={6}/>
    </div> */}
    </div>
  )
};

SellOrders.layout = 'admin'

export default SellOrders