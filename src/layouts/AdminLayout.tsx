import React, { ReactNode, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import AdminMenu from '../components/adminMenu';
import Breadcrumb from '../components/breadcrumb';
import { PlutusLogo } from '../components/icons';
import { UserInfoProvider } from '../components/providers';

const { Header, Sider, Content } = Layout;

interface Props {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <UserInfoProvider>
      <Layout className='flex h-screen'>
        <Sider
          trigger={null}
          width={250}
          collapsible
          collapsed={collapsed}
          theme='light'>
          {!collapsed &&
            <PlutusLogo />
          }
          <AdminMenu styles={{ background: "transparent", color: "white" }} />
        </Sider>
        <Layout>
          <Header className='flex items-center mt-6' style={{ padding: "10px 40px", boxShadow: "-1px 13px 11px -4px rgba(255,255,255,0.34)", background: 'white' }}>
            <div className='text-primary-500 text-xl'>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>
            <Breadcrumb />
          </Header>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </UserInfoProvider>

  );
};

export default AdminLayout;