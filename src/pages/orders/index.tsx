import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AddSupplyChainModal, DeleteSupplyChainModal, EditSupplyChainModal } from '../../components/modals';

interface DataType {
  orderId: React.Key;
  name: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'OrderId',
    dataIndex: 'orderId',
    width: 150,
  },
  {
    title: 'from',
    dataIndex: 'from',
    width: 150,
  },
  {
    title: 'to',
    dataIndex: 'to',
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    render: () => (
      <Space size="middle">
        <Tag color="green">Accept</Tag>
        <Tag color="red">Reject</Tag>
      </Space>
    )
  },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    orderId: i,
    name: `Plutus ${i}`,
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry ${i}`,
  });
}

const Orders = () => (
  <div className='border rounded-lg p-5'>
    <div className='flex justify-between mb-10'>
      <Input
        prefix={<SearchOutlined className='mr-2 font-bold text-lg' />}
        placeholder="Search Supply Chains"
        bordered={false}
        className='w-[300px] text-[14px] h-12 border-none !bg-neutral-100 font-normal' />
      <AddSupplyChainModal />
    </div>
    <Table columns={columns} dataSource={data} scroll={{y: 450}} />
    {/* <div className="flex justify-end mt-5">
      <Pagination defaultCurrent={6} total={10} pageSize={6}/>
    </div> */}
  </div>
);

Orders.layout = 'admin'

export default Orders