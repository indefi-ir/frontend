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
    label: 'مدیریت محصولات',
    path: '/supply-chain'
  },
  {
    key: '3',
    icon: <CompanyIcon />,
    label: 'مدیریت درخواست ها',
    path: '/companies'
  },
  {
    key: '4',
    icon: <FinancierIcon />,
    label: 'تامین کننده ها',
    path: '/financiers'
  }
]

const companyMenuItems = [
  {
    key: '1',
    icon: <DashboardIcon />,
    label: 'داشبورد',
    path: '/dashboard'
  },
  {
    key: '2',
    icon: <BuyOrderIcon />,
    label: 'سفارشات',
    path: '/orders'
  }
]
const AdminMenu = ({ styles }: Props) => {
  const { role }: any = React.useContext(userInfoContext);

  return (
    <Menu mode="inline" style={styles} className="text-base">
      {role === 'Company'
        ? (companyMenuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} className="!my-6 text-white">
            <Link href={item.path}>
              {item.label}
            </Link>
          </Menu.Item>
        )))

        : (adminMenuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} className="!my-6 text-white">
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