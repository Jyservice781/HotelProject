import Header from "../component/Header";
import HotelCard from "../component/HotelCard";
import {Container} from "react-bootstrap";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import PopularHotel from "../component/PopularHotel";
import {createContext, useRef} from "react";
import Nav from "../component/Nav";

let refContext = createContext(null);

let Main = () => {

    const popularRef = useRef(null);
    const hotelRef = useRef(null);

    console.log('ref :', popularRef);

    return (
        <refContext.Provider value={{popularRef, hotelRef}}>
            <Header/>
            <Nav />
            <Container fluid style={{width: '80%'}}>
                <HotelCard max={15} id={'hotelList'} ref={hotelRef}/>
                <Banner/>
                <PopularHotel max={10} id={'popular'} ref={popularRef}/>
            </Container>
            <Footer/>
        </refContext.Provider>
    )
}

export default Main;
