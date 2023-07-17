import { Card, Col, Row, Segmented, Space, Table, Tag } from "antd";
import { useState } from "react";
import { companiesUrl, transactionsUrl, getCreditsEverUrl, getBillsValueStatusUrl } from "../../services/apiEndpoint";
import { fetcher } from "../../services/axios";
import dateFormat from "../../utils/dateFormat";
import useSWR from 'swr';
import toPersianDigits from "../../utils/toPersianDigits";

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
    render: (record: any) => (
      <div className='truncate w-[80px]'>{toPersianDigits(record)}</div>
    )
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
    title: 'مقدار',
    dataIndex: 'invoice',
    key: 'invoice',
    render: (record: any) => (
      <div className="text-right">
        <span className="ml-1">{record?.productAmount}</span>
        <span>{record?.productUnit?.name}</span>
      </div>
    )
  },
  {
    title: 'میزان اعتبار',
    dataIndex: 'amount',
    key: 'amount',
    render: (record: any) => (
      <div>{toPersianDigits(record)}</div>
    )
  },
  {
    title: 'تاریخ ایجاد',
    dataIndex: 'date',
    key: 'date',
    render: (record: string) => (
      toPersianDigits(dateFormat(record))
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
    render: (record: any) => (
      <div>{toPersianDigits(record)}</div>
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
      toPersianDigits(dateFormat(record))
    ),
  },
]);

const Dashboard = () => {
  const [options, setOptions] = useState(['ماه جاری', 'سال جاری', 'همه زمان ها']);
  const { data: companies } = useSWR(companiesUrl, fetcher);
  const { data: bills } = useSWR(transactionsUrl, fetcher);
  const { data: totalCredit } = useSWR(getCreditsEverUrl, fetcher);

  const { data: getCreditWithNotPaidStatus } = useSWR(`${getBillsValueStatusUrl}0`, fetcher);
  const { data: getCreditWithExpireStatus } = useSWR(`${getBillsValueStatusUrl}3`, fetcher);
  const { data: getCreditWithPaidStatus } = useSWR(`${getBillsValueStatusUrl}2`, fetcher);

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
              <span className="text-2xl block mb-2">{toPersianDigits(totalCredit?.data)} ریال</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="flex flex-col" bordered={false}>
              <div className="flex justify-end">
                <img src="/images/cleared.png" alt="" />
              </div>
              <span className="text-black-500 block mb-2">تسویه شده</span>
              <span className="text-2xl block mb-2">{toPersianDigits(getCreditWithPaidStatus?.data)} ریال</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="flex flex-col" bordered={false}>
              <div className="flex justify-end">
                <img src="/images/outstanding-debt.png" alt="" />
              </div>
              <span className="text-black-500 block mb-2">بدهی های معوقه</span>
              <span className="text-2xl block mb-2">{toPersianDigits(getCreditWithExpireStatus?.data)} ریال</span>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="flex flex-col" bordered={false}>
              <div className="flex justify-end">
                <img src="/images/awaiting-payment.png" alt="" />
              </div>
              <span className="text-black-500 block mb-2">در انتظار پرداخت</span>
              <span className="text-2xl block mb-2">{toPersianDigits(getCreditWithNotPaidStatus?.data)} ریال</span>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="my-4">
        <Row gutter={16}>
          <Col span={10}>
            <Card
              className="h-full"
              title={<span className="text-gray-400 font-medium">شرکت های های اخیر</span>}
              extra={<a href="#" className="text-pasargad-yellow-400">بیشتر</a>} >
              <Table
                locale={{ emptyText: "داده ای برای نمایش وجود ندارد." }}
                columns={CompanyColumns} dataSource={companies?.data} />
            </Card>
          </Col>
          <Col span={14}>
            <Card 
              className="h-full"
              title={<span className="text-gray-400 font-medium">صورتحساب های اخیر</span>} 
              extra={<a href="#" className="text-pasargad-yellow-400">بیشتر</a>} >
              <Table locale={{ emptyText: "داده ای برای نمایش وجود ندارد." }} columns={BillsColumns} dataSource={bills?.data} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

Dashboard.layout = 'admin';

export default Dashboard;

