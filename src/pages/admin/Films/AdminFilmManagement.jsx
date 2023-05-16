import { Table, Button } from 'antd';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Input } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './Films.scss'
import { deleteFilmAction, setFilmListAction } from '../../../redux/reducers/FilmManagementReducer/FilmManagementActions';

const { Search } = Input;

function AdminFilmManagement() {
    const columns = [
        {
            title: 'Film ID',
            dataIndex: 'maPhim',
            key: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['ascend', 'descend'],
            width: '15%'
        },
        {
            title: 'Name',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
            sorter: (a, b) => {
                return a.tenPhim.localeCompare(b.tenPhim);
            },
            sortDirections: ['ascend', 'descend'],
            width: '25%'
        },
        {
            title: 'Image',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (text, film, index) => {
                return <>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </>
            },
            width: '15%'
        },
        {
            title: 'Description',
            key: 'moTa',
            dataIndex: 'moTa',
            render: (text, film) => {
                return <>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + ' ...' : film.moTa}
                </>
            },
            width: '25%'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, film) => {
                return <>
                    <NavLink key={1} className="mr-2 text-2xl" to={`/admin/films/editfilm/${film.maPhim}`}>
                        <EditOutlined style={{ color: 'blue' }} />
                    </NavLink>
                    <button key={2} className="mr-2 text-2xl" to="/"><DeleteOutlined style={{ color: 'red' }} onClick={async () => {
                        await dispatch(deleteFilmAction(film.maPhim));
                        dispatch(setFilmListAction(searchTerm));
                    }} /></button>
                    <NavLink key={3} className='text-2xl' to={`/admin/films/showtime/${film.maPhim}`}>
                        <CalendarOutlined style={{ color: 'green' }} />
                    </NavLink>
                </>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
    ];

    const { arrFilm } = useSelector(state => state.FilmManagementReducer);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const action = setFilmListAction();

        dispatch(action);
    }, [])
    const data = arrFilm;
    
    const timerRef = useRef();
    const handleChange = (event) => {
        clearTimeout(timerRef);

        timerRef.current = setTimeout(() => {
            dispatch(setFilmListAction(event.target.value));
            setSearchTerm(event.target.value);
        }, 1000)
    };

    return (
        <div>
            <h1 className='text-4xl font-semibold'>FILMS MANAGEMENT</h1>
            <Button className="mb-5" onClick={() => {
                navigate('/admin/films/addnewfilm');
            }}>Add film</Button>
            <div className='flex justify-end my-5'>
                <div style={{ width: '50%' }}>
                    <Search placeholder="Input name of film" onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            dispatch(setFilmListAction(event.target.value));
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

export default AdminFilmManagement