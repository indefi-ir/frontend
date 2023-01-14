import React, { ReactNode, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, theme } from 'antd';
import AdminMenu from '../components/adminMenu/AdminMenu';
import Breadcrumb from '../components/breadcrumb/BreadCrumb';

const { Header, Sider, Content } = Layout;

interface Props {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  return (
    <Layout className='h-screen'>
      <Sider
        trigger={null}
        width={320}
        collapsible
        collapsed={collapsed}
        theme='light'
        style={{ background: colorPrimary, padding: "30px 15px" }}>
        <div className="logo" />
        <AdminMenu styles={{ background: colorPrimary, color: "white" }} />
      </Sider>
      <Layout>
        <Header className='flex items-center' style={{ padding: "10px 20px", boxShadow: "-1px 13px 11px -4px rgba(255,255,255,0.34)", background: colorBgContainer }}>
          <div className=''>
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
  );
};

export default AdminLayout;