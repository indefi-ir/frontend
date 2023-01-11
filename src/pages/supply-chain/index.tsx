import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AddSupplyChainModal, EditSupplyChainModal } from '../../components/modal';

interface DataType {
  id: React.Key;
  name: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: 150,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <EditSupplyChainModal />
      </Space>
    )
  }
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i,
    name: `Plutus ${i}`,
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry ${i}`,
  });
}

const SupplyChain = () => (
  <>
    <div className='flex justify-between mb-10'>
      <Input
        prefix={<SearchOutlined className='mr-2 font-bold' />}
        placeholder="Search Supply Chains"
        bordered={false}
        className='w-[300px] text-[14px] h-12 border-none !bg-neutral-100 font-normal' />
        <AddSupplyChainModal />
    </div>
    <Table columns={columns} dataSource={data} scroll={{ y: 600 }} />
  </>
);

SupplyChain.layout = 'admin'

export default SupplyChain