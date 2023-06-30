import React, { ReactNode, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import AdminMenu from '../components/adminMenu';
import Breadcrumb from '../components/breadcrumb';
import { PlutusLogo } from '../components/icons';
import { useRouter } from 'next/router';

const { Header, Sider, Content } = Layout;

interface Props {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('companyId');
    localStorage.removeItem('id');
    router.push(`/login`);
  }

  return (
    <Layout className='flex'>
      <Sider
        trigger={null}
        width={250}
        collapsible
        theme='light'
        collapsed={collapsed}
      >
        {!collapsed &&
          <div className='flex justify-center'>
            <PlutusLogo />
          </div>
        }
        <AdminMenu />
      </Sider>
      <Layout>
        <Header className='flex items-center justify-between mt-6' style={{ padding: "0px 40px", boxShadow: "-1px 13px 11px -4px rgba(255,255,255,0.34)", background: 'white' }}>
          <div className='flex items-center'>
            <div className='text-primary-500 text-xl'>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>
            <Breadcrumb />
          </div>
          <Button danger icon={<PoweroffOutlined />} onClick={logoutUser}>خروج کاربر</Button>
        </Header>
        <Content style={{ margin: '16px', minHeight:"100vh"}}>
          <div>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;