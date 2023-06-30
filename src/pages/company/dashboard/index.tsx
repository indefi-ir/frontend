import { Card, Col, Row, Segmented, Space, Table, Tag } from "antd";
import { useState } from "react";
import useSWR from 'swr';

const DashboardCompany = () => {
  const [options, setOptions] = useState(['ماه جاری', 'سال جاری', 'همه زمان ها']);
  // const { data } = useSWR(companiesUrl, fetcher);
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
    </>
  )
}

DashboardCompany.layout = 'admin';

export default DashboardCompany;

