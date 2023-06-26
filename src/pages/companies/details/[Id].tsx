import { Avatar, Card, Col, Form, List, Row, Tag, Select, Button, Collapse, CollapseProps } from "antd";
import { useRouter } from 'next/router';
import { companyDetailsByIdUrl, CreditUsedUrl, totalCreditsUrl, updateCompanyStatusUrl } from "../../../services/apiEndpoint";
import { fetcher, patch, put } from "../../../services/axios";
import useSWR, { mutate } from 'swr';
import { CompanyInfo, TransactionProductVolume } from "../../../features";
const { Option } = Select;

const renderStatus = (status: any) => {
  switch (status) {
    case 1:
      return <Tag color="green">فعال</Tag>;
    case 0:
      return <Tag color="red">مسدود شده</Tag>;
    case 2:
      return <Tag color="gold">مسدود موقت</Tag>;
  }
}

const data = (companyDetails: any) => [
  {
    key: 1,
    iconUrl: '/images/information-icon.png',
    title: 'شناسه ملی شرکت',
    description: `${companyDetails?.data?.nationalID}`
  },
  {
    key: 2,
    iconUrl: '/images/phone-icon.png',
    title: 'شماره تلفن',
    description: `${companyDetails?.data?.phoneNumber}`
  },
  {
    key: 3,
    iconUrl: '/images/address-icon.png',
    title: 'آدرس پستی',
    description: `${companyDetails?.data?.address}`
  },
];


const text = `A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];



const DetailsCompany = () => {
  const router = useRouter();
  const { Id } = router.query;

  const companyDetailsUrl = `${companyDetailsByIdUrl}${Id}`;
  const { data: companyDetails, error: companyDetailsError } = useSWR(companyDetailsUrl, fetcher);


  const companyTotalCreditsUrl = `${totalCreditsUrl}${Id}`;
  const { data: companyTotalCredits, error: companyTotalCreditsError } = useSWR(companyTotalCreditsUrl, fetcher);

  const companyCreditUsedUrl = `${CreditUsedUrl}${Id}`;
  const { data: companyCreditUsed, error: companyCreditUsedError } = useSWR(companyCreditUsedUrl, fetcher);

  const onFinish = async (values: any) => {
    const finalData = { ...values }
    const result = await patch(`${updateCompanyStatusUrl}${Id}`,
      finalData);
    await mutate(companyDetailsUrl);
    if (result.success) { }
  };

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card className="mb-4">
          <CompanyInfo />
        </Card>
        <Card className="mb-4">
          <div className="flex-col">
            <div className="flex justify-between mb-6">
              <span className="block text-lg">وضعیت</span>
              <div>
                {renderStatus(companyDetails?.data?.status)}
              </div>
            </div>
            <Form
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item name="companyStatus" label="وضعیت شرکت">
                <Select>
                  <Option value={1}>مسدود</Option>
                  <Option value={0}>فعال</Option>
                  <Option value={2}>مسدود موقت</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button className="bg-primary-500" type="primary" htmlType="submit">
                  ذخیره
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
        <Card>
          <span>ابزار های مالی</span>
        </Card>
      </Col>
      <Col span={18}>
        <div className="flex-col">
          <Row gutter={16} className="mb-4">
            <Col span={8}>
              <Card className="flex flex-col" bordered={false}>
                <span className="text-primary-500 block text-base font-bold mb-4">کل اعتبار داده شده</span>
                <p className="text-2xl mb-2 text-left text-gray-400">
                  <span className="inline-block ml-2">{companyTotalCredits?.data}</span>
                  <span>توکن</span>
                </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="flex flex-col" bordered={false}>
                <span className="text-primary-500 block text-base font-bold mb-4">اعتبار استفاده شده</span>
                <p className="text-2xl mb-2 text-left text-gray-400">
                  <span className="inline-block ml-2">{companyCreditUsed?.data}</span>
                  <span>توکن</span>
                </p>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="flex flex-col" bordered={false}>
                <span className="text-primary-500 block text-base font-bold mb-4">مانده اعتبار</span>
                <p className="text-2xl mb-2 text-left text-gray-400">
                  <span className="inline-block ml-2">{companyTotalCredits?.data - companyTotalCredits?.data}</span>
                  <span>توکن</span>
                </p>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} className="mb-4">
            <Col span={8}>
              <Card className="h-96 h-full">
                <span className="block text-lg">حجم معاملات</span>
                <div className="flex justify-center items-center">
                  <TransactionProductVolume />
                </div>
              </Card>
            </Col>
            <Col span={16}>
              <Card className="h-96">
                test
              </Card>
            </Col>
          </Row>
          <Collapse collapsible="header" items={items} defaultActiveKey={['1']} />
        </div>
      </Col>
      <Col span={24}>
      </Col>
    </Row>
  )
}

DetailsCompany.layout = 'admin';
export default DetailsCompany;