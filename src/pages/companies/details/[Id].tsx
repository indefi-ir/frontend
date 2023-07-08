import { Avatar, Card, Col, Form, List, Row, Tag, Select, Button, Collapse, CollapseProps, Table } from "antd";
import { useRouter } from 'next/router';
import { companyDetailsByIdUrl, getAllTransferForCompanyUrl, getCreditsEverForCompanyUrl, getReceivedCreditForCompanyUrl, transactionsUrl, updateCompanyStatusUrl } from "../../../services/apiEndpoint";
import { fetcher, patch, put } from "../../../services/axios";
import useSWR, { mutate } from 'swr';
import { CompanyInfo, MemberChains, SimpleLineChart, TransactionProductVolume } from "../../../features";
import dateFormat from "../../../utils/dateFormat";
const { Option } = Select;

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
      <div className="text-right">{record?.name}</div>
    ),
  },
  {
    title: 'به شرکت',
    dataIndex: 'to',
    key: 'to',
    render: (record: any) => (
      <div className="text-right">{record?.name}</div>
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

const DetailsCompany = () => {
  const router = useRouter();
  const { Id } = router.query;
  const { data: bills } = useSWR(transactionsUrl, fetcher);
  const companyDetailsUrl = `${companyDetailsByIdUrl}${Id}`;
  const { data: companyDetails, error: companyDetailsError } = useSWR(companyDetailsUrl, fetcher);


  const companyTotalCreditsUrl = `${getCreditsEverForCompanyUrl}${Id}`;
  const { data: companyTotalCredits, error: companyTotalCreditsError } = useSWR(companyTotalCreditsUrl, fetcher);


  const companyCreditTransferForCompanyUrl = `${getAllTransferForCompanyUrl}${Id}`;
  const { data: companyCreditTransferForCompany, error: companyCreditUsedError } = useSWR(companyCreditTransferForCompanyUrl, fetcher);


  const companyCreditReceivedForCompanyUrl = `${getReceivedCreditForCompanyUrl}${Id}`;
  const { data: companyCreditReceivedForCompany, error: companyCreditReceivedForCompanyError } = useSWR(companyCreditTransferForCompanyUrl, fetcher);



  const onFinish = async (values: any) => {
    const finalData = { ...values }
    const result = await patch(`${updateCompanyStatusUrl}${Id}`,
      finalData);
    await mutate(companyDetailsUrl);
    if (result.success) { }
  };

  return (
    <>
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
                    <Option value={0}>مسدود</Option>
                    <Option value={1}>فعال</Option>
                    <Option value={2}>مسدود موقت</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button className="bg-pasargad-yellow-400" type="primary" htmlType="submit">
                    ذخیره
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <div className="flex-col">
            <Row gutter={16} className="mb-4">
              <Col span={8}>
                <Card className="flex flex-col" bordered={false}>
                  <span className="text-primary-500 block text-base font-bold mb-4">کل اعتبار دریافتی از سرمایه گذار</span>
                  <p className="text-2xl mb-2 text-left text-gray-400">
                    <span className="inline-block ml-2">{companyTotalCredits?.data}
                    </span>
                    <span>توکن</span>
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="flex flex-col" bordered={false}>
                  <span className="text-primary-500 block text-base font-bold mb-4">اعتبار منتقل شده</span>
                  <p className="text-2xl mb-2 text-left text-gray-400">
                    <span className="inline-block ml-2">{companyCreditTransferForCompany?.data}</span>
                    <span>توکن</span>
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="flex flex-col" bordered={false}>
                  <span className="text-primary-500 block text-base font-bold mb-4">کل اعتبار دریافتی از شرکت ها</span>
                  <p className="text-2xl mb-2 text-left text-gray-400">
                    <span className="inline-block ml-2">{companyCreditReceivedForCompany?.data}</span>
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
              <Col span={10}>
                <Card className="flex items-center h-full">
                  <SimpleLineChart />
                </Card>
              </Col>
              <Col span={6}>
                <Card className="flex items-center flex-col h-[48%] mb-4" bordered={false}>
                  <span className="text-primary-500 block text-base font-bold mb-4">میزان فروش</span>
                  <p className="text-2xl mb-2 text-left text-gray-400">
                    <span className="inline-block ml-2">{companyTotalCredits?.data - companyTotalCredits?.data}</span>
                    <span>توکن</span>
                  </p>
                </Card>
                <Card className="flex items-center flex-col h-[48%]" bordered={false}>
                  <span className="text-primary-500 block text-base font-bold mb-4">میزان خرید </span>
                  <p className="text-2xl mb-2 text-left text-gray-400">
                    <span className="inline-block ml-2">{companyTotalCredits?.data - companyTotalCredits?.data}</span>
                    <span>توکن</span>
                  </p>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <Card className="flex justify-center">
            <TransactionProductVolume />
          </Card>
        </Col>
        <Col span={18}>
          <MemberChains companyId={Id}/>
          <Card title={<span className="text-gray-400 font-medium">صورتحساب های اخیر</span>}>
            <Table columns={BillsColumns} dataSource={bills?.data} scroll={{ y: 450 }} />
          </Card>

        </Col>

      </Row>
    </>
  )
}

DetailsCompany.layout = 'admin';
export default DetailsCompany;