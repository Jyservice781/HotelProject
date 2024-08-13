import {Link} from "react-router-dom";
import {Stack} from "react-bootstrap";

let Header = () => {
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
                    <li className={'m-lg-3'}><Link to={'/register'}>회원가입</Link></li>
                    <li className={'m-lg-3'}><Link to={'/login'}>로그인</Link></li>
                </ul>
            </Stack>
        </header>
    )
}

export default Header