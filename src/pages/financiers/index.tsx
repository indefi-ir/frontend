import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AddFinanciersModal, DeleteFinanciersModal, EditFinanciersModal } from '../../components/modals';

interface DataType {
  id: React.Key;
  name: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Balance',
    dataIndex: 'Balance',
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
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i,
    name: `Plutus ${i}`,
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry ${i}`,
  });
}

const Financiers = () => (
  <div className='border rounded-lg p-5'>
    <div className='flex justify-between mb-10'>
      <Input
        prefix={<SearchOutlined className='mr-2 font-bold text-lg' />}
        placeholder="Search Financiers"
        bordered={false}
        className='w-[300px] text-[14px] h-12 border-none !bg-neutral-100 font-normal' />
      <AddFinanciersModal />
    </div>
    <Table columns={columns} dataSource={data} scroll={{y: 450}} />
    {/* <div className="flex justify-end mt-5">
      <Pagination defaultCurrent={6} total={10} pageSize={6}/>
    </div> */}
  </div>
);

Financiers.layout = 'admin'

export default Financiers