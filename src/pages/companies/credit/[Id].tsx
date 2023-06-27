import React from 'react';
import { Card, Col, Row } from 'antd';
import CompanyInfo from '../../../features/company-information/CompanyInfo';
import { AddCreditCompany } from '../../../features';


const CreditCompany = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <CompanyInfo />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <AddCreditCompany />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          Card content
        </Card>
      </Col>
    </Row>
  )
}
CreditCompany.layout = 'admin';
export default CreditCompany