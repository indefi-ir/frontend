import { Card, Col, Row, Segmented, Space, Table, Tag } from "antd";
import { useState } from "react";
import { companiesUrl } from "../../services/apiEndpoint";
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

const columns = ([
  {
    title: 'نام شرکت',
    dataIndex: 'name',
    key: 'name',
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
  const { data } = useSWR(companiesUrl, fetcher);
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
        <Card title="صورتحساب های اخیر" extra={<a href="#">بیشتر</a>} >
          <Table columns={columns} dataSource={data?.data} scroll={{ y: 450 }} />
        </Card>
        {/* <Card title="صورتحساب های اخیر" extra={<a href="#">بیشتر</a>} >
          <Table columns={columns} dataSource={data?.data} scroll={{ y: 450 }} />
        </Card> */}
      </div>
    </>
  )
}

Dashboard.layout = 'admin';

export default Dashboard;

