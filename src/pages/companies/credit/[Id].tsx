import React from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import { Card, Col, Empty, Row } from 'antd';
import CompanyInfo from '../../../features/company-information/CompanyInfo';
import { AddCreditCompany, TransactionProductVolume } from '../../../features';
import { fetcher } from '../../../services/axios';
import { getCreditsEverForCompanyUrl } from '../../../services/apiEndpoint';


const CreditCompany = () => {
  const router = useRouter();
  const { Id } = router.query;
  const companyTotalCreditsUrl = `${getCreditsEverForCompanyUrl}${Id}`;
  const { data: companyTotalCredits, error: companyTotalCreditsError } = useSWR(companyTotalCreditsUrl, fetcher);

  const financialInstrument = [
    { name: "توکن", value: companyTotalCredits?.data },
    { name: "گام", value: 0 },
    { name: "برات", value: 0 },
  ];


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
        <Card className='h-full'>
          <span className="block text-lg">ابزارهای مالی</span>
          <div className="flex justify-center items-center">
            {/* {companyTotalCredits?.data > 0
              ? <TransactionProductVolume data={financialInstrument} />
              : <Empty description="داده ای برای نمایش وجود ندارد." className="mt-10" />
            } */}

              <TransactionProductVolume data={undefined}  />
          </div>
        </Card>
      </Col>
    </Row>
  )
}
CreditCompany.layout = 'admin';
export default CreditCompany