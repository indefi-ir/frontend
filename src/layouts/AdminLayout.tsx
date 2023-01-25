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
        {/* <Button className="flex items-center bg-pink text-white hover:bg-pink-dark hover:!text-white font-medium text-sm border-0 px-2 !py-6">
        <span className="mx-2"> 
          Create New Order
        </span>
      </Button> */}
      </Sider>
      <Layout>
        <Header className='flex items-center mt-6' style={{ padding: "10px 40px", boxShadow: "-1px 13px 11px -4px rgba(255,255,255,0.34)", background: 'white' }}>
          <div className='text-purple text-xl'>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>
          <Breadcrumb />
        </Header>
        <UserInfoProvider>
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              {children}
            </div>
          </Content>
        </UserInfoProvider>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;