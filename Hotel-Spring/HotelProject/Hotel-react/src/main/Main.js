import {Route, Routes} from "react-router-dom";
import Header from "../component/Header";
import HotelCard from "../component/HotelCard";
import {Container} from "react-bootstrap";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import PopularHotel from "../component/PopularHotel";


let Main = () => {
    return(
        <>
            <Routes>
                <Route path={"*"} element={<Header/>}/>
            </Routes>
            <hr />
            <Container fluid style={{width:'80%'}}>
                <HotelCard max={15} />
                <Banner />
                <PopularHotel max={10}/>
            </Container>
            <Footer/>
        </>

    )
}

export default Main;