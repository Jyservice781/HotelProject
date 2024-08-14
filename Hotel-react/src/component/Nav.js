import {Button, Stack} from "react-bootstrap";

let Nav = () => {

    return (
        <nav>
            <Stack direction="horizontal" className="d-sm-flex justify-content-center align-items-center">
                    <Button size={"sm"} onClick={()=>{
                        window.scrollTo({
                            top: 150,
                            behavior: 'smooth',
                        })
                    }}> 호텔상품 보기
                        </Button>
                    <Button size={"sm"} className={'m-lg-3'} onClick={()=>{
                        window.scrollTo({
                        top: 2700,
                        behavior: 'smooth',
                    })
                    }}> 인기상품 보기 </Button>
            </Stack>
        </nav>
    )
}

export default Nav;