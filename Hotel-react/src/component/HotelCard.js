import {Button, Card} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

let HotelCard = ({max}) => {
    return (
        <>
            {Array.from({length: max}, (_, index) => (
                <div style={{width: '280px', display: 'inline-block', margin: '2%'}}>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src="holder.js/100px180" style={{width: 'inherit', height: '180px'}}/>
                        <Card.Body>
                            <Card.Title>Hotel Title</Card.Title>
                            <Card.Text>
                                오션뷰의 아주 예쁜 호텔입니다아ㅏ아다 가족들과 함께 여행하기도 좋고 혼자 여행해도 부담가지 않는 갓성비 갑 호텔입니다 아주 예쁜 호텔입니ㅏ다!
                            </Card.Text>
                            <Link to={'details'}>
                                <Button variant="primary">
                                    Go somewhere
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            ))}

        </>
    );
}

export default HotelCard;