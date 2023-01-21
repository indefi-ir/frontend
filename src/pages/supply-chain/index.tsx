import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Space, Table } from 'antd';
import useSWR from 'swr';
import { fetcher } from '../../services/axios';
import type { ColumnsType } from 'antd/es/table';
import { AddSupplyChainModal, DeleteSupplyChainModal, EditSupplyChainModal } from '../../components/modals';

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
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Space size="middle">
        <EditSupplyChainModal />
        <DeleteSupplyChainModal />
      </Space>
    )
  }
];

const SupplyChain = () => {
  //@ts-ignore
  const { data } = useSWR<DataType[]>("/api/SupplyChains", fetcher)

  return (
    <div className='border rounded-lg p-5'>
      <div className='flex justify-between mb-10'>
        <Input
          prefix={<SearchOutlined className='mr-2 font-bold text-lg' />}
          placeholder="Search Supply Chains"
          bordered={false}
          className='w-[300px] text-[14px] h-12 border-none !bg-neutral-100 font-normal' />
        <AddSupplyChainModal />
      </div>
      <Table columns={columns} dataSource={data} scroll={{ y: 450 }} />
      {/* <div className="flex justify-end mt-5">
      <Pagination defaultCurrent={6} total={10} pageSize={6}/>
    </div> */}
    </div>
  )
};

SupplyChain.layout = 'admin'

export default SupplyChain