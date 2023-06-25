import { Avatar, Card, Col, Form, List, Row, Tag, Select, Button, Collapse, CollapseProps } from "antd";
import { useRouter } from 'next/router';
import { companyDetailsByIdUrl, CreditUsedUrl, totalCreditsUrl } from "../../../services/apiEndpoint";
import { fetcher } from "../../../services/axios";
import useSWR from 'swr';
const { Option } = Select;

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



const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const DetailsCompany = () => {
  const router = useRouter();
  const {Id} = router.query;

  const companyDetailsUrl = `${companyDetailsByIdUrl}${Id}`;
  const {data:companyDetails, error:companyDetailsError} = useSWR(companyDetailsUrl,fetcher);
  
  const companyTotalCreditsUrl = `${totalCreditsUrl}${Id}`;
  const {data:companyTotalCredits, error:companyTotalCreditsError} = useSWR(companyTotalCreditsUrl,fetcher);

  const companyCreditUsedUrl = `${CreditUsedUrl}${Id}`;
  const {data:companyCreditUsed, error:companyCreditUsedError} = useSWR(companyCreditUsedUrl,fetcher);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card className="mb-4">
          <div className='flex flex-col'>
            <div className='p-1'>
              <div className='flex flex-col divide-y divide-gray-50'>
                <div className='flex flex-col justify-center items-center mb-3'>
                  <Avatar size={80} className="mb-2" />
                  <div className='mb-1'>{companyDetails?.data?.name}</div>
                  <div>{companyDetails?.data?.email}</div>
                </div>
                <div>
                  <List
                    itemLayout="horizontal"
                    dataSource={data(companyDetails)}
                    renderItem={(item) => (
                      <List.Item key={item.key}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.iconUrl} />}
                          title={item.title}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </Card>
        <Card className="mb-4">
          <div className="flex-col">
            <div className="flex justify-between">
              <div className="block">وضعیت</div>
              <Tag color="green">
                فعال
              </Tag>
            </div>
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item name="gender" label="وضعیت شرکت" rules={[{ required: true }]}>
                <Select
                  // onChange={}
                  allowClear
                >
                  <Option value="male">فعال</Option>
                  <Option value="female">مسدود</Option>
                  <Option value="other">مسدود موقت</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
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
              <Card className="h-96">
                test
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