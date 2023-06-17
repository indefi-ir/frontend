import { Menu } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BuyOrderIcon, CompanyIcon, DashboardIcon, FinancierIcon, SellOrderIcon, SupplyChainIcon } from '../icons';
import { userInfoContext } from '../providers/userInfoProvider/UserInfoProvider';

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
    icon: <SupplyChainIcon />,
    label: 'شرکت ها',
    path: '/companies'
  },
  {
    key: '3',
    icon: <CompanyIcon />,
    label: 'درخواست ها',
    path: '/requests'
  },
  {
    key: '4',
    icon: <FinancierIcon />,
    label: 'مدیریت زنجیره ها',
    path: '/supply-chains'
  },
  {
    key: '5',
    icon: <FinancierIcon />,
    label: 'صورتحساب ها',
    path: '/bills'
  }
]

const companyMenuItems = [
  {
    key: '1',
    icon: <DashboardIcon />,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    key: '2',
    icon: <BuyOrderIcon />,
    label: 'Orders',
    path: '/orders'
  }
]
const AdminMenu = ({ styles }: Props) => {
  const { role }: any = React.useContext(userInfoContext);

  return (
    <Menu mode="inline" style={styles} className="text-base px-2">
      {role === 'Company'
        ? (companyMenuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} className="!my-6">
            <Link href={item.path}>
              {item.label}
            </Link>
          </Menu.Item>
        )))

        : (adminMenuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} className="!my-6 text-black-500">
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