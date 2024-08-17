import { Button, Card } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel, userInfo }) => {
    // 이미지 URL 설정: 호텔 이미지가 있을 경우 랜덤 이미지 선택, 없으면 기본 이미지 사용
    const thumbnailUrl = hotel.images && hotel.images.length > 0
        ? `http://localhost:8080/hotel/uploads/${hotel.id}/${hotel.roomNumber}/${hotel.images[Math.floor(Math.random() * hotel.images.length)]}`
        : 'placeholder.jpg'; // 기본 이미지 URL 또는 로컬 파일

    return (
        <div style={{ width: '280px', display: 'inline-block', margin: '2%' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={thumbnailUrl} style={{ width: 'inherit', height: '180px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title>{hotel.name}</Card.Title>
                    <Card.Text>
                        <p>설명:</p> {hotel.shortContent}<br/>
                        <p>평점:</p> {/*{reply.score}*/}
                    </Card.Text>
                    <Link to={`/hotel/showOne/${hotel.id}`} state={{ userInfo: userInfo }}>
                        <Button variant="primary">
                            자세히 보기
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default HotelCard;
