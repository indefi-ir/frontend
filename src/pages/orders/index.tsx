import { SearchOutlined } from '@ant-design/icons';
import { Input, Table, Tag } from 'antd';
import useSWR from 'swr';
import { fetcher } from '../../services/axios';
import { ordersUrl } from '../../services/apiEndpoint';
import { useState } from 'react';
import dateFormat from '../../utils/dateFormat';
import { AddOrderModal, UpdateOrderStateModal } from '../../components/modals';

const renderStatus = (status: string) => {
  switch (status) {
    case 'Accept':
      return <Tag color="green">accepted</Tag>;
    case 'Reject':
      return <Tag color="red">rejected</Tag>;
    case 'Cancel':
      return <Tag>cancelled</Tag>;
    case 'Pending':
      return <Tag color="gold">pending</Tag>;
  }
}

const columns = (searchTerm: any) => ([
  {
    title: 'Tracking code',
    dataIndex: 'trackingCode',
  },
  {
    title: 'From',
    dataIndex: 'fromCompanyName',
  },
  {
    title: 'To',
    dataIndex: 'toCompanyName',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    render: (record: string) => (
      dateFormat(record, 'YYYY-MM-DD h:mm:ss a')
    ),
    width: 300
  },
  {
    title: 'Description',
    dataIndex: 'description',
    filteredValue: [searchTerm],
    onFilter: (value: any, record: {
      description: any;
    }) => {
      return record.description.includes(value)
    },
  },
  {
    title: 'Status',
    dataIndex: 'orderState',
    render: (record: string) => (
      renderStatus(record)
    )
  },
  {
    render: (record: any) => record?.allowedActions.map((item: string) =>
      <UpdateOrderStateModal
        key={record.id}
        orderAction={item}
        orderId={record.id}
        ordersListUrl={ordersUrl}
      />
    )
  }
]);

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(ordersUrl, fetcher)

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
        <AddOrderModal />
      </div>
      <Table columns={columns(searchTerm)} dataSource={data?.data} scroll={{ y: 450 }} />
    </div>
  )
};

Orders.layout = 'admin'

export default Orders
