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
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb />
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;