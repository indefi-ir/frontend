import { Menu } from 'antd';
import Link from 'next/link';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

interface Props {
  styles?: any;
}

const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Dashboard',
    path: '/'
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: 'Supply chains',
    path: '/supply-chain'
  },
  {
    key: '3',
    icon: <VideoCameraOutlined />,
    label: 'Companies',
    path: '/companies'
  },
  {
    key: '4',
    icon: <UploadOutlined />,
    label: 'Financiers',
    path: '/financiers'
  },
  {
    key: '5',
    icon: <UploadOutlined />,
    label: 'Orders',
    path: '/orders'
  },
]
const AdminMenu = ({ styles }: Props) => {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} style={styles} className="text-base">
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link href={item.path}>
            {item.label}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}
export default AdminMenu