import { Avatar, Card, Col, Form, List, Row, Tag, Select, Button, Collapse, CollapseProps, Table, Empty, Steps } from "antd";
import { useRouter } from 'next/router';
import { companyDetailsByIdUrl, getAllTransferAmountAllProductForCompanyUrl, getAllTransferForCompanyUrl, getAveragePriceForAllProductForCompany, getCreditsEverForCompanyUrl, getReceivedAmountAllProductForCompanyUrl, getReceivedCreditForCompanyUrl, transactionsUrl, updateCompanyStatusUrl } from "../../../services/apiEndpoint";
import { fetcher, patch, put } from "../../../services/axios";
import useSWR, { mutate } from 'swr';
import { CompanyInfo, MemberChains, SimpleLineChart, TransactionProductVolume } from "../../../features";
import dateFormat from "../../../utils/dateFormat";
import toPersianDigits from "../../../utils/toPersianDigits";
import SimpleBarChart from "../../../features/chart/SimpleBarChart";
const { Option } = Select;

const Step = Steps.Step;
const BillsColumns = ([
  {
    title: 'شماره صورتحساب ',
    dataIndex: 'txId',
    key: 'txId',
    render: (record: any) => (
      <div className='truncate w-[100px]'>{toPersianDigits(record)}</div>
    )
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
      toPersianDigits(dateFormat(record))
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


  const { data: allTransferAmountAllProductForCompany } = useSWR(`${getAllTransferAmountAllProductForCompanyUrl}${Id}`, fetcher);

  const { data: receivedAmountAllProductForCompany } = useSWR(`${getReceivedAmountAllProductForCompanyUrl}${Id}`, fetcher);

  console.log("allTransferAmountAllProductForCompany", allTransferAmountAllProductForCompany)

  console.log("receivedAmountAllProductForCompany", receivedAmountAllProductForCompany)

  const { data: averagePriceForAllProductForCompany } = useSWR(`${getAveragePriceForAllProductForCompany}${Id}&startTime=2022-09-01T02:25:20.619Z&endTime=2024-09-01T02:25:20.619Z`, fetcher);

  const companyCreditReceivedForCompanyUrl = `${getReceivedCreditForCompanyUrl}${Id}`;
  const { data: companyCreditReceivedForCompany, error: companyCreditReceivedForCompanyError } = useSWR(companyCreditReceivedForCompanyUrl, fetcher);


  const onFinish = async (values: any) => {
    const finalData = { ...values }
    const result = await patch(`${updateCompanyStatusUrl}${Id}`,
      finalData);
    await mutate(companyDetailsUrl);
    if (result.success) { }
  };

  const financialInstrument = [
    ["financialInstrument", ""],
    ["توکن",  companyTotalCredits?.data ],
    ["گام",  10 ],
    ["برات",  10 ],
  ];


  const productCategoriesTransfer: any = [["productCategoriesTransfer", ""],];
  allTransferAmountAllProductForCompany?.data?.map((category: { value: any; productCategory: any; }) => (
    productCategoriesTransfer.push(
      [category.productCategory.name,
      category.value,]
    )
  ));

  const productCategoriesReceive: any = [["productCategoriesReceive", ""],];
  receivedAmountAllProductForCompany?.data?.map((category: { value: any; productCategory: any; }) => (
    productCategoriesReceive.push(
      [category.productCategory.name,
      category.value,]
    )
  ));

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
                  <Button className="bg-primary-500" type="primary" htmlType="submit">
                    ذخیره
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
          <Card className="h-fit">
            <span className="block text-lg">ابزارهای مالی</span>
            <div className="flex justify-center items-center">
              {companyTotalCredits?.data > 0
                ? <TransactionProductVolume data={financialInstrument} />
                : <Empty description="داده ای برای نمایش وجود ندارد." className="mt-10" />
              }
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
                    <span className="inline-block ml-2">{
                      toPersianDigits(companyTotalCredits?.data)?.toLocaleString()
                    }
                    </span>
                    <span>ریال</span>
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="flex flex-col" bordered={false}>
                  <span className="text-primary-500 block text-base font-bold mb-4">اعتبار منتقل شده</span>
                  <p className="text-2xl mb-2 text-left text-gray-400">
                    <span className="inline-block ml-2">
                      {toPersianDigits(companyCreditTransferForCompany?.data)?.toLocaleString()}
                    </span>
                    <span>ریال</span>
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="flex flex-col" bordered={false}>
                  <span className="text-primary-500 block text-base font-bold mb-4">کل اعتبار دریافتی از شرکت ها</span>
                  <p className="text-2xl mb-2 text-left text-gray-400">
                    <span className="inline-block ml-2">
                      {toPersianDigits(companyCreditReceivedForCompany?.data)?.toLocaleString()}
                    </span>
                    <span>ریال</span>
                  </p>
                </Card>
              </Col>
            </Row>
            <Row gutter={16} className="mb-4">
              <Col span={12}>
                <Card className="h-full">
                  <span className="block text-lg">مبلغ کالاهای خریداری شده</span>
                  <div className="flex justify-center items-center">
                    {allTransferAmountAllProductForCompany?.data?.length == 0
                      ? <Empty description="داده ای برای نمایش وجود ندارد." className="my-10" />
                      : <TransactionProductVolume data={productCategoriesTransfer} />
                    }
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="h-full">
                  <span className="block text-lg">مبلغ کالاهای فروخته شده</span>
                  <div className="flex justify-center items-center">
                    {receivedAmountAllProductForCompany?.data?.length == 0
                      ? <Empty description="داده ای برای نمایش وجود ندارد." className="my-10" />
                      : <TransactionProductVolume data={productCategoriesReceive} />
                    }
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={16} className="mb-4">
              <Col span={24}>
                <Card className="h-full h-96">
                  <span className="block text-lg">میانگین قیمت فروش کالاها</span>
                  <div className="flex justify-center items-center">
                    {averagePriceForAllProductForCompany?.data?.length == 0
                      ? <Empty description="داده ای برای نمایش وجود ندارد." className="my-10" />
                      : <SimpleBarChart data={averagePriceForAllProductForCompany?.data} />
                    }
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
          <MemberChains companyId={Id} />
          <Card title={<span className="text-gray-400 font-medium">صورتحساب های اخیر</span>}>
            <Table locale={{ emptyText: "داده ای برای نمایش وجود ندارد." }} columns={BillsColumns} dataSource={bills?.data} />
          </Card>
        </Col>
      </Row>
    </>
  )
}

DetailsCompany.layout = 'admin';
export default DetailsCompany;