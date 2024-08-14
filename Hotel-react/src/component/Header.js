import {Link} from "react-router-dom";
import {Stack} from "react-bootstrap";

let Header = ({ userInfo }) => {
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
                    <li> welcome, {userInfo ? userInfo.nickname : 'Guest'}. </li>
                    {/* 조건부 렌더링: 사용자 역할에 따라 링크 표시 */}
                    {userInfo ? (
                        <li>
                            {userInfo.role === 'role_admin' && (
                                <span className={'m-lg-3'}><Link to={'/admin/users'}>회원 관리</Link></span>
                            )}
                            {userInfo.role === 'role_seller' && (
                                <span className={'m-lg-3'}><Link to={'/user/basket/${userInfo.id}'}>호텔 관리</Link></span>
                            )}
                            {userInfo.role === 'role_customer' && (
                                <span className={'m-lg-3'}><Link to={'/user/basket/${userInfo.id}'}>장바구니</Link></span>
                            )}
                            <span className={'m-lg-3'}><Link to={'/logout'}>로그아웃</Link></span>
                        </li>
                    ) : (
                        <li>
                            <span className={'m-lg-3'}><Link to={'/login'}>로그인</Link></span>
                            <span className={'m-lg-3'}><Link to={'/register'}>회원가입</Link></span>
                        </li>
                    )}
                </ul>
            </Stack>
        </header>
    )
}

export default Header