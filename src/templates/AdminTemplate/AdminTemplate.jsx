import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    PlusOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './AdminTemplate.scss'
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { OPEN_USER_MODAL } from '../../redux/reducers/UserManagementReducer/UserManagementTypes';
import { useDispatch } from 'react-redux';
import { ADD_ACTION } from '../../util/settings/Config';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function AdminTemplate() {
    return <LayoutAdmin />
}

export default AdminTemplate

const LayoutAdmin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    return (
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                    <SubMenu key={1} icon={<UserOutlined />} title="Users">
                        <Menu.Item key="11" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users list</NavLink>
                        </Menu.Item>
                        <Menu.Item key="12" icon={<PlusOutlined />} onClick={() => {
                            dispatch({ type: OPEN_USER_MODAL, purpose: ADD_ACTION })
                        }}>
                            <NavLink to="/admin/users">Add new user</NavLink>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="2" icon={<FileOutlined />} title="Films">
                        <Menu.Item key="21" icon={<FileOutlined />}>
                            <NavLink to="/admin/films">Films list</NavLink>
                        </Menu.Item>
                        <Menu.Item key="22" icon={<PlusOutlined />}>
                            <NavLink to="/admin/films/addnewfilm">Add new film</NavLink>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className='bg-white' />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};