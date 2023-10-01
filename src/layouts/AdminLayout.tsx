import React, { ReactNode, useContext, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, theme } from 'antd';
import useSWR, { mutate } from 'swr';
import AdminMenu from '../components/adminMenu';
import Breadcrumb from '../components/breadcrumb';
import { useRouter } from 'next/router';
import { fetcher } from '../services/axios';
import { myCompanyInfoUrl } from '../services/apiEndpoint';
import { UserInfoContext } from '../components/providers';

const { Header, Sider, Content } = Layout;

interface Props {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const { userInfo } = useContext(UserInfoContext);
  const router = useRouter();

  const { data } = useSWR(userInfo.role === "Funder" ? null : myCompanyInfoUrl, fetcher);
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
        className='sidebar'
        collapsed={collapsed}
      >
        {!collapsed &&
          <div className='flex justify-center ' style={{ padding: "10px" }}>
            {userInfo.role === "Funder"
              ? <div className='flex flex-col items-center justify-center'>
                <Avatar src="/images/pasargad-logo-desktop.svg" shape="square" size={84} className="border" />
                <span className='block text-[#9d9d9d] text-base mt-4'>بانک پاسارگاد</span>
              </div>
              : <div className='flex flex-col items-center justify-center'>
                <Avatar shape="square" src={data?.data?.logo} size={84} />
                <span className='block text-[#9d9d9d] text-base mt-4'>{data?.data?.name}</span>
              </div>
            }
          </div>
        }
        <AdminMenu />
      </Sider>
      <Layout>
        <Header className='flex items-center justify-between' style={{ padding: "0px 40px", boxShadow: "-1px 13px 11px -4px rgba(255,255,255,0.34)", background: 'white' }}>
          <div className='flex items-center'>
            <div className='text-primary-500 text-xl'>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>
            {/* <Breadcrumb /> */}
          </div>
          <Button className='bg-primary-100 text-primary-500' icon={<PoweroffOutlined />} onClick={logoutUser}>خروج کاربر</Button>
        </Header>
        <Content style={{ margin: '16px', minHeight: "90vh", padding: '20px' }}>
          <div>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;