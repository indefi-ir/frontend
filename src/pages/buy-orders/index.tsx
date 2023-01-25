import { SearchOutlined } from '@ant-design/icons';
import { Input, Table, Tag } from 'antd';
import useSWR from 'swr';
import { fetcher } from '../../services/axios';
import { buyOrdersUrl, updateOrderState } from '../../services/apiEndpoint';
import { useState } from 'react';
import dateFormat from '../../utils/dateFormat';
import { UpdateOrderStateModal } from '../../components/modals';


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
    title: 'tracking code',
    dataIndex: 'trackingCode',
  },
  {
    title: 'to',
    dataIndex: 'toCompanyName',
  },
  {
    title: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'time',
    dataIndex: 'time',
    render: (record: string) => (
      dateFormat(record)
    )
  },
  {
    title: 'description',
    dataIndex: 'description',
    filteredValue: [searchTerm],
    onFilter: (value: any, record: {
      description: any;
    }) => {
      return record.description.includes(value)
    },
  },
  {
    title: 'status',
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
        updateStateUrl={updateOrderState}
        ordersListUrl={buyOrdersUrl}
      />
    )
  }
]);

const BuyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("")
  //@ts-ignore
  const { data } = useSWR(buyOrdersUrl, fetcher)

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

BuyOrders.layout = 'admin'

export default BuyOrders
