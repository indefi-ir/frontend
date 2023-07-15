// ts-ignore
import { Menu } from 'antd';
import Link from 'next/link';
import React, { useContext } from 'react';
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
    label: 'تراکنش ها',
    path: '/bills'
  },
  {
    key: '5',
    icon: <FinancierIcon />,
    label: 'محصولات',
    path: '/products',
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
    label: 'تراکنش ها',
    path: '/company/bills'
  },
]
const AdminMenu = ({ styles }: Props) => {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <Menu mode="inline" style={styles} className="text-base mb-10 px-2">
      {
        userInfo.role === "Funder"
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