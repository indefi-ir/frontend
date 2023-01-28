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
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    key: '2',
    icon: <SupplyChainIcon />,
    label: 'Supply chains',
    path: '/supply-chain'
  },
  {
    key: '3',
    icon: <CompanyIcon />,
    label: 'Companies',
    path: '/companies'
  },
  {
    key: '4',
    icon: <FinancierIcon />,
    label: 'Financiers',
    path: '/financiers'
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