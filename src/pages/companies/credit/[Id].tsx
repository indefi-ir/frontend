import React from 'react';
import { Card, Col, Row } from 'antd';
import CompanyInfo from '../../../features/company-information/CompanyInfo';
import { AddCreditCompany, TransactionProductVolume } from '../../../features';


const CreditCompany = () => {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card className='h-full'>
          <CompanyInfo />
        </Card>
      </Col>
      <Col span={10}>
        <Card className="h-full">
          <AddCreditCompany />
        </Card>
      </Col>
      <Col span={8}>
        <Card className='flex justify-center h-full'>
          <TransactionProductVolume />
        </Card>
      </Col>
    </Row>
  )
}
CreditCompany.layout = 'admin';
export default CreditCompany