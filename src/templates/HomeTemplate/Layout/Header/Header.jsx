import React from 'react';
import styles from './Header.module.scss';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_LOGIN } from '../../../../util/settings/Config';
import Swal from 'sweetalert2';
import { changeTab, logOut, resetSignUp } from '../../../../redux/reducers/slices/userSlice/userSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let userLogin = null;
    if (localStorage.getItem(USER_LOGIN)) {
        userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
    }

    return (
        <div className={'bg-black z-50 fixed w-full ' + styles['header-movie']} style={{ height: '60px' }}>
            <Navbar
                fluid={true}
                className='sm:px-8 px-4 h-full'
                style={{
                    backgroundColor: '#000'
                }}
            >
                <Navbar.Brand className={styles['logo-image']} href="/">
                    <img
                        src={require("../../../../assets/header-logo.png")}
                        className="sm:mr-3 mr-1" style={{
                            width: '100%'
                        }}
                        alt="header-logo"
                    />
                </Navbar.Brand>
                <div className="flex md:order-2">
                    {userLogin ? <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar className={styles['avatar']} alt="User settings" img="https://picsum.photos/300/300" rounded={true} />}
                        className={'rounded-none ' + styles['dropdownMovie']}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {userLogin?.taiKhoan}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {userLogin?.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item className={styles['MenuItem']}>
                            <i className="fa fa-cog mr-2"></i> Settings
                        </Dropdown.Item>
                        <Dropdown.Item className={styles['MenuItem']} onClick={async () => {
                            await dispatch(changeTab(1));
                            navigate(`/profile/${userLogin?.taiKhoan}`);
                        }}>
                            <i className="fa fa-user mr-2"></i> Profile
                        </Dropdown.Item>
                        <Dropdown.Item className={styles['MenuItem']} onClick={async () => {
                            await dispatch(changeTab(2));
                            navigate(`/profile/${userLogin?.taiKhoan}`);
                        }}>
                            <i className="fa fa-history mr-2"></i> Booking history
                        </Dropdown.Item>
                        {/* If the user is Admin, one more dropdown item (admin management) */}
                        {
                            userLogin.maLoaiNguoiDung === "QuanTri" ? <Dropdown.Item className={styles['MenuItem']} onClick={() => {
                                navigate("/admin");
                            }}>
                                <i className="fa fa-users mr-1"></i> Admin management
                            </Dropdown.Item> : null
                        }
                        <Dropdown.Divider />
                        <Dropdown.Item className={"border border-t-2 " + styles['MenuItem']} onClick={() => {
                            Swal.fire({
                                title: 'Are you sure to logout?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#ff0000',
                                cancelButtonColor: '#848484',
                                confirmButtonText: 'Confirm'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Logout successfully!',
                                        text: 'Thank you for using our services',
                                        icon: 'success',
                                        confirmButtonColor: '#ff0000'
                                    })
                                    dispatch(logOut());

                                    //reload page
                                    window.location.reload();
                                }
                            })
                        }}>
                            <i className="fa fa-sign-out-alt mr-2"></i> Log out
                        </Dropdown.Item>
                    </Dropdown> : <div className='grid grid-cols-2'>
                        <button className='text-white border border-y-0 border-l-0 border-r-1 md:px-2 px-1 transition-all duration-500 hover:text-orange-500 cursor-pointer md:text-base text-xs' onClick={() => {
                            dispatch(resetSignUp());
                            navigate('/signin')
                        }}>
                            <i className="fa fa-user mx-1"></i> Sign in
                        </button>
                        <button className='text-white md:px-2 px-1 transition-all duration-500 hover:text-orange-500 cursor-pointer md:text-base text-xs' onClick={() => {
                            dispatch(resetSignUp());
                            navigate('/signup')
                        }}>
                            <i className="fa fa-user mx-1"></i> Sign up
                        </button>
                    </div>}
                </div>
                <Navbar.Collapse className='lg:flex md:hidden'>
                    <Navbar.Link
                        className={styles['NavbarItem']}
                        href="/"
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link className={styles['NavbarItem']} href="#filmList">
                        Film List
                    </Navbar.Link>
                    <Navbar.Link className={styles['NavbarItem']} href="#showtimes">
                        Showtimes
                    </Navbar.Link>
                    <Navbar.Link className={styles['NavbarItem']} href="#news">
                        News
                    </Navbar.Link>
                    <Navbar.Link className={styles['NavbarItem']} href="#app">
                        App
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Header