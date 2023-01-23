import { Menu } from 'antd';
import Link from 'next/link';
import { BuyOrderIcon, CompanyIcon, DashboardIcon, FinancierIcon, SellOrderIcon, SupplyChainIcon } from '../icons';

interface Props {
  styles?: any;
}

const menuItems = [
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
  },
  {
    key: '5',
    icon: <BuyOrderIcon />,
    label: 'Buy orders',
    path: '/buy-orders'
  },
  {
    key: '6',
    icon: <SellOrderIcon />,
    label: 'Sell orders',
    path: '/sell-orders'
  },
]
const AdminMenu = ({ styles }: Props) => {
  return (
    <Menu mode="inline" style={styles} className="text-base">
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} className="!my-6 text-white">
          <Link href={item.path}>
            {item.label}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}
export default AdminMenu