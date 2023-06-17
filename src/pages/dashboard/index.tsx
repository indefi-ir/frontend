import { Card, Col, Row, Space } from "antd";

const Dashboard = () => {
  return (
    <>
      <div>
        <span className="block mb-2"> اعتبارات</span>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={false}>
              Card content
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