import {NavLink} from "react-router-dom";
import {Button, Stack} from "react-bootstrap";

let Nav = () => {
    return(
        <nav>
            <Stack direction="horizontal" className="nav">
                <NavLink to={'/hotelList'}>
                    <Button>호텔상품 보기</Button>
                </NavLink>
                <NavLink to={'/popular'} className={'m-lg-3'}>
                    <Button>인기상품 보기</Button>
                </NavLink>
            </Stack>
        </nav>
    )
}

export default Nav;