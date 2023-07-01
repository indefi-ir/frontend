import { Card, Col, Row, Segmented, Space, Table, Tag } from "antd";
import { useState } from "react";
import { companiesUrl, transactionsUrl } from "../../services/apiEndpoint";
import { fetcher } from "../../services/axios";
import dateFormat from "../../utils/dateFormat";
import useSWR from 'swr';

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

const BillsColumns = ([
  {
    title: 'شماره صورتحساب ',
    dataIndex: 'txId',
    key: 'txId',
  },
  {
    title: 'از شرکت',
    dataIndex: 'from',
    key: 'from',
    render: (record: any) => (
      <div className="text-right">{record.name}</div>
    ),
  },
  {
    title: 'به شرکت',
    dataIndex: 'to',
    key: 'to',
    render: (record: any) => (
      <div className="text-right">{record.name}</div>
    ),
  },
  {
    title: 'محصول',
    dataIndex: 'productCategory',
    key: 'productCategory',
    render: (record: any) => (
      <div className="text-right">{record.name}</div>
    ),
  },
  {
    title: 'مقدار محصول',
    dataIndex: 'productAmount',
    key: 'productAmount',
  },
  {
    title: 'میزان اعتبار',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'date',
    key: 'date',
    render: (record: string) => (
      dateFormat(record)
    ),
  },
]);

const CompanyColumns = ([
  {
    title: 'نام شرکت',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'شناسه ملی شرکت',
    dataIndex: 'nationalID',
    key: 'nationalID',
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
      dateFormat(record)
    ),
  },
]);

const Dashboard = () => {
  const [options, setOptions] = useState(['ماه جاری', 'سال جاری', 'همه زمان ها']);
  const { data:companies } = useSWR(companiesUrl, fetcher);
  const { data:bills } = useSWR(transactionsUrl, fetcher);
  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <Segmented options={options} />
        </div>
        <span className="block mb-2"> اعتبارات</span>
        <Row gutter={16}>
          <Col span={6}>
            <Card className="flex flex-col" bordered={false}>
              <div className="flex justify-end">
                <img src="/images/total-credit.png" alt="" />
              </div>
              <span className="text-black-500 block mb-2">کل اعتبار</span>
              <span className="text-2xl block mb-2">۱۰۰۰ میلیون ریال</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="flex flex-col" bordered={false}>
              <div className="flex justify-end">
                <img src="/images/cleared.png" alt="" />
              </div>
              <span className="text-black-500 block mb-2">تسویه شده</span>
              <span className="text-2xl block mb-2">۲۵۰ میلیون ریال</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="flex flex-col" bordered={false}>
              <div className="flex justify-end">
                <img src="/images/outstanding-debt.png" alt="" />
              </div>
              <span className="text-black-500 block mb-2">بدهی های معوقه</span>
              <span className="text-2xl block mb-2">۲۵۰ میلیون ریال </span>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="flex flex-col" bordered={false}>
              <div className="flex justify-end">
                <img src="/images/awaiting-payment.png" alt="" />
              </div>
              <span className="text-black-500 block mb-2">در انتظار پرداخت</span>
              <span className="text-2xl block mb-2">۵۰ میلیون ریال</span>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="flex my-4">
        <Row gutter={16}>
          <Col span={12}>
            <Card title={<span className="text-gray-400 font-medium">شرکت های های اخیر</span>} extra={<a href="#" className="text-primary-500">بیشتر</a>} >
              <Table columns={CompanyColumns} dataSource={companies?.data} scroll={{ y: 450 }} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={<span className="text-gray-400 font-medium">صورتحساب های اخیر</span>} extra={<a href="#" className="text-primary-500">بیشتر</a>} >
              <Table columns={BillsColumns} dataSource={bills?.data} scroll={{ y: 450 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

Dashboard.layout = 'admin';

export default Dashboard;

