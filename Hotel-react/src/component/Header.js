import {Link, Route, Routes} from "react-router-dom";
import Nav from "./Nav";
import {Stack} from "react-bootstrap";

let Header = () => {
    return(
        <header className={'container-fluid'}>
            <Stack  direction="horizontal" gap={3}>
                <Link to={'/'}>호텔 로고</Link>
                <ul className={'flex ms-auto'}>
                    <li><Link to={'/'}>호텔</Link></li>
                    <li><Link to={'/login'}>로그인</Link></li>
                    <li><Link to={'/plus'}>더보기</Link></li>
                </ul>
            </Stack>
            <Routes>
                <Route path={'/'} element={<Nav/>} />
            </Routes>
        </header>
    )
}

export default Header