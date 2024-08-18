import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {Stack} from "react-bootstrap";
import UserInfo from "../admin/UserInfo";

let Header = ({ userInfo }) => {
    const [showModal, setShowModal] = useState(false);
    let btnStyle = {
        listStyleType: 'none',
        display: 'flex',
    }

    let headerStyle = {
        background: '#ffffff',
        boxShadow:  '15px 15px 45px #bdbdbd, -15px -15px 45px #ffffff',
        padding: '0px',
        margin: '0px',
        marginBottom: '50px'
    }
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <header className={'container-fluid'} style={headerStyle}>
            <Stack direction="horizontal">
                <Link to={'/'}>
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="로고"
                         style={{
                             width:'120px',
                             height:'auto'
                         }}/>
                </Link>
                <ul className={'flex ms-auto'} style={btnStyle}>
                    <li> 환영합니다, {userInfo ? userInfo.nickname : 'Guest'}님. </li>
                    {/*사용자 역할에 따라 링크 표시 */}
                    {userInfo ? (
                        <>
                        {userInfo.role === 'role_admin' && (
                            <li className={'m-lg-3'}><Link to={'/admin/users'}>회원 관리</Link></li>
                        )}
                        {userInfo.role === 'role_seller' && (
                            <li className={'m-lg-3'}><Link to={`/user/myhotel/${userInfo.id}`}>내 호텔 관리</Link></li>
                        )}
                        {userInfo.role === 'role_customer' && (
                            <ul>
                                <li className={'m-lg-3'}>
                                    <button onClick={handleShowModal} style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}>
                                        마이페이지
                                    </button>
                                </li>
                                <li className={'m-lg-3'}><Link to={`/user/basket/${userInfo.id}`}>장바구니</Link></li>
                                <li className={'m-lg-3'}><Link to={`/user/basketChecked/${userInfo.id}`}>예약내역</Link>
                                </li>
                            </ul>
                        )}
                            <li className={'m-lg-3'}><Link to={'/logout'}>로그아웃</Link></li>
                        </>

                    ) : (
                        <li>
                            <span className={'m-lg-3'}><Link to={'/login'}>로그인</Link></span>
                            <span className={'m-lg-3'}><Link to={'/register'}>회원가입</Link></span>
                        </li>
                    )}
                </ul>
            </Stack>
            {userInfo && (
                <UserInfo
                    show={showModal}
                    onHide={handleCloseModal}
                    userId={userInfo.id}
                />
            )}
        </header>
    )
}

export default Header