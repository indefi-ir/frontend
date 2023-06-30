import useSWR from 'swr';
import { Menu } from 'antd';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { myCompanyInfoUrl } from '../../services/apiEndpoint';
import { fetcher } from '../../services/axios';
import { BillsCompanyIcon, CompanyIcon, DashboardIcon, FinancierIcon, RequestIcon, SupplyChainIcon } from '../icons';
import { UserInfoContext } from '../providers';

interface Props {
  styles?: any;
}

const adminMenuItems = [
  {
    key: '1',
    icon: <DashboardIcon />,
    label: 'داشبورد',
    path: '/dashboard'
  },
  {
    key: '2',
    icon: <CompanyIcon />,
    label: 'شرکت ها',
    path: '/companies'
  },
  // {
  //   key: '3',
  //   icon: <CompanyIcon />,
  //   label: 'درخواست ها',
  //   path: '/requests'
  // },
  {
    key: '3',
    icon: <SupplyChainIcon />,
    label: 'مدیریت زنجیره ها',
    path: '/supply-chains'
  },
  {
    key: '4',
    icon: <FinancierIcon />,
    label: 'صورتحساب ها',
    path: '/bills'
  }
]

const companyMenuItems = [
  {
    key: '1',
    icon: <DashboardIcon />,
    label: 'داشبورد',
    path: '/company/dashboard'
  },
  {
    key: '2',
    icon: <RequestIcon />,
    label: 'پیش فاکتورها',
    path: '/company/requests'
  },
  {
    key: '3',
    icon: <BillsCompanyIcon />,
    label: 'صورتحساب ها',
    path: '/company/bills'
  },
]
const AdminMenu = ({ styles }: Props) => {
  const { userInfo } = useContext(UserInfoContext);
  const { data: companyInfo, error: companyError } = useSWR(myCompanyInfoUrl, fetcher);

  const token = typeof window !== "undefined" ?  window.localStorage.getItem('token') : false;

  useEffect(()=> {
    localStorage.setItem('id', JSON.stringify(companyInfo?.data?.id))
  }, [token] )

  return (

    <Menu mode="inline" style={styles} className="text-base px-2">
      {
        userInfo?.role === "Funder"
          ? (adminMenuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} className="!my-6 text-black-500">
              <Link href={item.path}>
                {item.label}
              </Link>
            </Menu.Item>
          )))

          : (companyMenuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} className="!my-6">
              <Link href={item.path}>
                {item.label}
              </Link>
            </Menu.Item>
          )))
      }
    </Menu>

  )
}
export default AdminMenu