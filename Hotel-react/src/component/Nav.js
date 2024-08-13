import {Button, Stack} from "react-bootstrap";
import {forwardRef, useRef} from "react";

let Nav = forwardRef((props, ref) => {

    let targetRef = useRef(null);

    let scrollHandler = () => {
        let target = ("hotelList");
        if (target) {
            targetRef.current.scrollIntoView({behavior: "smooth"});
        }
    }

    let scrollPopular = () => {
        let target = ("hotelList");
        if (target) {
            targetRef.current.scrollIntoView({behavior: "smooth"});
        }
    }
    return (
        <nav  ref={ref} id={props.id}>
            <Stack direction="horizontal" className="d-sm-flex justify-content-center align-items-center">
                <Button onClick={scrollHandler} ref={targetRef}  size={"sm"}> 호텔상품 보기 </Button>
                <Button onClick={scrollPopular} ref={targetRef} size={"sm"} className={'m-lg-3'}> 인기상품 보기 </Button>
            </Stack>
        </nav>
    )
})

export default Nav;