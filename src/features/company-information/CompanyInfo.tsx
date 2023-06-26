import { useRouter } from 'next/router';
import { Avatar, List } from "antd";
import { companyDetailsByIdUrl } from '../../services/apiEndpoint';
import useSWR from 'swr';
import { fetcher } from '../../services/axios';

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


const CompanyInfo = () => {
  const router = useRouter();
  const { Id } = router.query;

  const companyDetailsUrl = `${companyDetailsByIdUrl}${Id}`;
  const { data: companyDetails, error: companyDetailsError } = useSWR(companyDetailsUrl, fetcher);

  return (
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
  )
}

export default CompanyInfo;