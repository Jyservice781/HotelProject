import Header from "../component/Header";
import HotelCard from "../component/HotelCard";
import {Container} from "react-bootstrap";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import PopularHotel from "../component/PopularHotel";
import Nav from "../component/Nav";
import {useLocation} from "react-router-dom";


let Main = () => {
    // useLocation 훅을 사용하여 현재 위치의 상태를 가져옵니다.
    const location = useLocation();
    let userInfo = location.state?.userInfo; // optional chaining을 사용하여 안전하게 접근

    console.log('userInfo:', userInfo);


    return (
        <>
            <Header userInfo={userInfo}/>
            <Nav/>
            <Container fluid style={{width: '80%'}}>
                <HotelCard max={15}/>
                <Banner/>
                <PopularHotel max={10} />
            </Container>
            <Footer/>
        </>
    );
}

export default Main;
