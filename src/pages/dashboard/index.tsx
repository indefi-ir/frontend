import { Card, Col, Row, Segmented, Space } from "antd";
import { useState } from "react";

const Dashboard = () => {
  const [options, setOptions] = useState(['ماه جاری', 'سال جاری', 'همه زمان ها']);
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
      <div className="my-4">
        <Row gutter={16}>
          <Col span={16}>
            <Card title="Default size card" extra={<a href="#">بیشتر</a>} >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Default size card" extra={<a href="#">بیشتر</a>} >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

Dashboard.layout = 'admin';

export default Dashboard;