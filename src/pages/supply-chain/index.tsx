import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
  <Table columns={columns} dataSource={data} scroll={{ y: 600 }} />
);

SupplyChain.layout = 'admin'

export default SupplyChain