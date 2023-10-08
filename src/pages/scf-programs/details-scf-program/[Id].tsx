import useSWR from 'swr';
import { Avatar, Card, Space, Table, Tag, Tooltip } from "antd";
import nextRouter, { useRouter } from "next/router";
import { fetcher } from '../../../services/axios';
import { supplyChainDetailsUrl } from '../../../services/apiEndpoint';
import { ViewChain } from '../../../features';
import { TableRowSelection } from 'antd/es/table/interface';
import Meta from 'antd/es/card/Meta';
import { CreditIcon, EyeIcon } from '../../../components/icons';
import dateFormat from '../../../utils/dateFormat';
import GraphChain from '../../../features/graph-chain/GraphChain';

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const renderStatus = (status: Number) => {
  switch (status) {
    case 1:
      return <Tag color="green">فعال</Tag>;
    case 0:
      return <Tag color="red">مسدود شده</Tag>;
    case 2:
      return <Tag color="gold">مسدود موقت</Tag>;
  }
}

const columns = () => ([
  {
    title: 'نام شرکت',
    dataIndex: 'name',
    key: 'name',
    render: (_: any, record: { name: string | any; email: string | any }) => (
      <Card bordered={false}>
        <Meta
          // avatar={<Avatar size={64} src={record?.logo ? record?.logo : "/images/logo-alternative.png"} />}
          avatar={<Avatar size={64} src={ "/images/logo-alternative.png"} />}
          title={record.name}
          description={record.email}
        />
      </Card>
    )
  },
  {
    title: 'شناسه ملی شرکت',
    dataIndex: 'nationalID',
    key: 'nationalID',
    render: (record: string) => (
      <div style={{ direction: "ltr" }} className="text-right">{toPersianNumbers(record)}</div>
    )
  },
  {
    title: 'تلفن',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (record: string) => (
      <div style={{ direction: "ltr" }} className="text-right">{toPersianNumbers(record)}</div>
    )
  },
  {
    title: 'وضعیت',
    dataIndex: 'companyStatus',
    render: (record: Number) => (
      renderStatus(record)
    )
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'creationDate',
    key: 'creationDate',
    render: (record: string) => (
      toPersianNumbers(dateFormat(record))
    ),
  },
  {
    title: "عملیات",
    key: "action",
    render: (_: any, record: any) => (
      <Space size="middle">
        <Tooltip placement="top" color="#7D7AED" title="مشاهده جزییات شرکت">
          <span className='cursor-pointer' onClick={() => nextRouter.push(`/companies/details/${record.id}`)}>
            <EyeIcon />
          </span>
        </Tooltip>
        <Tooltip placement="top" color="#7D7AED" title="افزودن اعتبار">
        <span className='cursor-pointer' onClick={() => nextRouter.push(`/companies/credit/${record.id}`)}>
          <CreditIcon />
        </span>
        </Tooltip>
      </Space>
    )
  }
]);

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const DetailsScfProgram = () => {
  const router = useRouter();
  const { chainId } = router.query;

  const supplyChainDetails = `${supplyChainDetailsUrl}${chainId}`;
  const { data: chainDetails, error: companyDetailsError } = useSWR(supplyChainDetails, fetcher);

  return (
    <>
      <Card>
        <div className="mb-10">
          <h1 className="text-3xl	mb-4">{chainDetails?.data?.name}</h1>
          <p>{chainDetails?.data?.description}</p>
        </div>
        <div className="mb-10">
          <span className="block mb-2">
            اسناد مربوط به برنامه
          </span>
          {/* <div className="flex justify-center items-center border-dashed border-2 border-gray-50 p-4 rounded-md">
          <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div> */}
        </div>
        {/* <Table
          columns={columns}
          rowSelection={{ ...rowSelection }}
          dataSource={data}
        /> */}
        <div>
          <span className="block mb-2">
            زنجیره تامین
          </span>
          <div className=" border-dashed border-2 border-gray-50 p-10 rounded-md">
            <ViewChain chain={chainDetails?.data?.cordinates} chainId={chainDetails?.data?.id} />
          </div>
        </div>
        {/* <GraphChain /> */}
      </Card>
    </>
  )
}

DetailsScfProgram.layout = 'admin';
export default DetailsScfProgram;

function toPersianNumbers(record: string): import("react").ReactNode {
  throw new Error('Function not implemented.');
}
