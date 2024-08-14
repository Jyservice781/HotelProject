import {Button, Stack} from "react-bootstrap";
import {Link} from 'react-scroll';

let Nav = ({ref}) => {
    let onMessage = () => {
        console.log(ref);
    }

    return (
        <nav>
            <Stack direction="horizontal" className="d-sm-flex justify-content-center align-items-center">
                <Link to="ref" spy={true} smooth={true} onClick={onMessage}>
                    <Button size={"sm"}> 호텔상품 보기 </Button>
                </Link>
                <Link to="ref" spy={true} smooth={true} onClick={onMessage}>
                    <Button size={"sm"} className={'m-lg-3'}> 인기상품 보기 </Button>
                </Link>
            </Stack>
        </nav>
    )
}

export default Nav;