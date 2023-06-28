import { Menu } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BuyOrderIcon, CompanyIcon, DashboardIcon, FinancierIcon, SupplyChainIcon } from '../icons';

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
  const [userRole, setUserRole] = useState<string | null>(null)

  const access_token = typeof window !== "undefined" && localStorage.getItem('token')

  useEffect(() => {
    setUserRole(localStorage.getItem('role'))
  }, [access_token]);


  return (
    <Menu mode="inline" style={styles} className="text-base px-2">
      {
      // userRole === "Funder"
         (adminMenuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} className="!my-6 text-black-500">
            <Link href={item.path}>
              {item.label}
            </Link>
          </Menu.Item>
        )))

        // : (companyMenuItems.map((item) => (
        //   <Menu.Item key={item.key} icon={item.icon} className="!my-6">
        //     <Link href={item.path}>
        //       {item.label}
        //     </Link>
        //   </Menu.Item>
        // )))
      }
    </Menu>
  )
}
export default AdminMenu