import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Space, Table } from 'antd';
import useSWR from 'swr';
import type { ColumnsType } from 'antd/es/table';
import { AddCompaniesModal, DeleteCompaniesModal, EditCompaniesModal } from '../../components/modals';
import { fetcher } from '../../services/axios';

interface DataType {
  id: React.Key;
  name: string;
  email: string;
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
];

const data: DataType[] = [];


const Companies = () => {
  const { data } = useSWR("/api/SupplyChains", fetcher)

  return (
    <div className='border rounded-lg p-5'>
      <div className='flex justify-between mb-10'>
        <Input
          prefix={<SearchOutlined className='mr-2 font-bold text-lg' />}
          placeholder="Search Supply Chains"
          bordered={false}
          className='w-[300px] text-[14px] h-12 border-none !bg-neutral-100 font-normal' />
        <AddCompaniesModal />
      </div>
      <Table columns={columns} dataSource={data} scroll={{ y: 450 }} />
      {/* <div className="flex justify-end mt-5">
      <Pagination defaultCurrent={6} total={10} pageSize={6}/>
    </div> */}
    </div>
  )
};

Companies.layout = 'admin'

export default Companies

