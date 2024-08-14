import Header from "../component/Header";
import HotelCard from "../component/HotelCard";
import {Button, Container, Stack} from "react-bootstrap";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import PopularHotel from "../component/PopularHotel";
import Nav from "../component/Nav";
import { useLocation } from "react-router-dom";
import {useRef} from "react";
import hotelCard from "../component/HotelCard";
import {Link} from "react-scroll";


let Main = () => {
    // useLocation 훅을 사용하여 현재 위치의 상태를 가져옵니다.
    const location = useLocation();
    let userInfo = location.state?.userInfo; // optional chaining을 사용하여 안전하게 접근

    console.log('userInfo:', userInfo);

   /* let window = () => {
        let winX = window.pageXOffset;
        let winY = window.pageYOffset;
        console.log(winX, winY);
    }*/

    // let refHotel = document.getElementById("hotelList");
    // let refPopular = document.getElementById("popularHotel");

    let Nav = () => {
        let onMessage = () => {
            console.log(ref);
        }

        return (
            <nav>
                <Stack direction="horizontal" className="d-sm-flex justify-content-center align-items-center">
                    <Link to={"hotelList"} spy={true} smooth={true} onClick={onMessage}>
                        <Button size={"sm"}> 호텔상품 보기 </Button>
                    </Link>
                    <Link to={"popularHotel"} spy={true} smooth={true} onClick={onMessage}>
                        <Button size={"sm"} className={'m-lg-3'}> 인기상품 보기 </Button>
                    </Link>
                </Stack>
            </nav>
        )
    }


    return (
        <>
            <Header userInfo={userInfo} />
            <Nav />
            <Container fluid style={{ width: '80%' }}>
                <HotelCard max={15} id={"hotelList"}/>
                <Banner />
                <PopularHotel max={10} id={"popularHotel"}/>
            </Container>
            <Footer />
        </>
    );
}

export default Main;
