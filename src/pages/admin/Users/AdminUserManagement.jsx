import { Table, Button } from 'antd';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import './Users.scss'
import { OPEN_USER_MODAL, RESET_INFOR_EDIT } from '../../../redux/reducers/UserManagementReducer/UserManagementTypes';
import UserModal from './UserModal';
import { deleteUserAction, getInforToEditAction, setUserListAction } from '../../../redux/reducers/UserManagementReducer/UserManagementActions';
import '../Films/Films.scss';
import { ADD_ACTION, EDIT_ACTION } from '../../../util/settings/Config';

const { Search } = Input;

function AdminUserManagement() {
  const columns = [
    {
      title: 'Username',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      sorter: (a, b) => a.taiKhoan - b.taiKhoan,
      sortDirections: ['ascend', 'descend'],
      width: '15%'
    },
    {
      title: 'Password',
      dataIndex: 'matKhau',
      key: 'matKhau',
      sorter: (a, b) => a.matKhau - b.matKhau,
      sortDirections: ['ascend', 'descend'],
      width: '15%'
    },
    {
      title: 'Name',
      dataIndex: 'hoTen',
      key: 'hoTen',
      sorter: (a, b) => {
        return a.hoTen.localeCompare(b.hoTen);
      },
      sortDirections: ['ascend', 'descend'],
      width: '15%'
    },
    {
      title: 'Phone number',
      dataIndex: 'soDT',
      key: 'soDT',
      sorter: (a, b) => a.soDT - b.soDT,
      sortDirections: ['ascend', 'descend'],
      width: '15%'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      sorter: (a, b) => a.email - b.email,
      sortDirections: ['ascend', 'descend'],
      width: '15%'
    },
    {
      title: 'Role code',
      key: 'maLoaiNguoiDung',
      dataIndex: 'maLoaiNguoiDung',
      sorter: (a, b) => a.maLoaiNguoiDung - b.maLoaiNguoiDung,
      sortDirections: ['ascend', 'descend'],
      width: '15%'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, user) => {
        return <>
          <button key={1} className="mr-2 text-2xl">
            <EditOutlined style={{ color: 'blue' }} onClick={async () => {
              await dispatch(getInforToEditAction(user.taiKhoan));
              dispatch({ type: OPEN_USER_MODAL, purpose: EDIT_ACTION });
            }} />
          </button>
          <button key={2} className="mr-2 text-2xl" onClick={async () => {
            await dispatch(deleteUserAction(user.taiKhoan));
            dispatch(setUserListAction(searchTerm));
          }}><DeleteOutlined style={{ color: 'red' }} /></button>
        </>
      },
      width: '20%'
    },
  ];

  const { userList, openModal } = useSelector(state => state.UserManagementReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserListAction());
  }, [])

  const data = userList;

  const timerRef = useRef();
  const handleChange = (event) => {
    clearTimeout(timerRef);

    timerRef.current = setTimeout(() => {
      dispatch(setUserListAction(event.target.value));
      setSearchTerm(event.target.value);
    }, 1000)
  };

  return (
    <div>
      {openModal && <UserModal />}
      <h1 className='text-4xl font-semibold'>USERS MANAGEMENT</h1>
      <Button className="mb-5" onClick={async () => {
        await dispatch({ type: RESET_INFOR_EDIT });
        dispatch({ type: OPEN_USER_MODAL, purpose: ADD_ACTION })
      }}>Add user</Button>
      <div className='flex justify-end my-5'>
        <div style={{ width: '50%' }}>
          <Search placeholder="Input username or name" onKeyDown={(event) => {
            if (event.key === 'Enter') {
              dispatch(setUserListAction(event.target.value));
            }
          }} onChange={handleChange} enterButton='Search' size='large' />
        </div>
      </div>
      <Table
        columns={columns}
        pagination={{
          position: ['bottomRight'],
        }}
        dataSource={data}
        rowKey={'maPhim'}
      />
    </div>
  )
}

export default AdminUserManagement