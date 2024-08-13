import Header from "../component/Header";
import HotelCard from "../component/HotelCard";
import { Container } from "react-bootstrap";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import PopularHotel from "../component/PopularHotel";
import { createContext, useRef } from "react";
import Nav from "../component/Nav";
import { useLocation } from "react-router-dom";

let refContext = createContext(null);

let Main = () => {
    // useLocation 훅을 사용하여 현재 위치의 상태를 가져옵니다.
    const location = useLocation();
    let userInfo = location.state?.userInfo; // optional chaining을 사용하여 안전하게 접근

    const popularRef = useRef(null);
    const hotelRef = useRef(null);

    console.log('userInfo:', userInfo);
    console.log('ref:', popularRef);

    return (
        <refContext.Provider value={{ popularRef, hotelRef }}>
            <Header userInfo={userInfo} />
            <Nav />
            <Container fluid style={{ width: '80%' }}>
                <HotelCard max={15} id={'hotelList'} ref={hotelRef} />
                <Banner />
                <PopularHotel max={10} id={'popular'} ref={popularRef} />
            </Container>
            <Footer />
        </refContext.Provider>
    );
}

export default Main;
