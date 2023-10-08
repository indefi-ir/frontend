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
    label: 'درخواست ها',
    path: '/requests'
  },
  {
    key: '3',
    icon: <CompanyIcon />,
    label: 'برنامه های تامین مالی',
    path: '/scf-programs'
  },
  {
    key: '4',
    icon: <CompanyIcon />,
    label: 'شرکت ها',
    path: '/companies'
  },
  
  {
    key: '5',
    icon: <SupplyChainIcon />,
    label: 'مدیریت زنجیره ها',
    path: '/supply-chains'
  },
  {
    key: '6',
    icon: <FinancierIcon />,
    label: 'تراکنش ها',
    path: '/bills'
  },
  {
    key: '7',
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
    label: 'حسابداری فروش',
    path: '/company/sales-accounting'
  },
  {
    key: '3',
    icon: <RequestIcon />,
    label: 'حسابداری خرید',
    path: '/company/purchase-accounting'
  },
  {
    key: '4',
    icon: <RequestIcon />,
    label: 'مدیریت جریان نقدی',
    path: '/company/cash-flow-management'
  },
  {
    key: '5',
    icon: <BillsCompanyIcon />,
    label: 'پروفایل شرکت',
    path: '/company/profile'
  },
]
const AdminMenu = ({ styles }: Props) => {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <Menu mode="inline" style={styles} className="text-base mb-10 px-2">
      {
        userInfo.role === "ANCHRO"
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