import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const MyHotelBySeller = () => {
    const { sellerid } = useParams(); // URL에서 sellerid 추출
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/myhotel/${sellerid}`);
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, [sellerid]);

    if (loading) return <p style={{ textAlign: 'center', fontSize: '18px' }}>로딩 중...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>오류: {error}</p>;
    const handleCancel = async (hotelId) => {
        try {
            const response = await fetch(`http://localhost:8080/hotel/delete/${hotelId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('호텔 삭제에 실패했습니다.');
            }
            // 성공적으로 취소한 후, 해당 호텔을 목록에서 제거
            setHotels(hotels.filter(hotel => hotel.id !== hotelId));
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>내 호텔 관리</h1>

            {hotels.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>등록된 호텔이 없습니다.</p>
            ) : (
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {hotels.map((hotel) => (
                        <li key={hotel.id} style={{
                            marginBottom: '20px',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <h2 style={{margin: '0 0 10px 0', fontSize: '18px'}}>{hotel.name}</h2>
                            <p style={{margin: '5px 0'}}><strong>예약 여부:</strong> {hotel.booked === 0 ? 'O' : 'X'}</p>
                            <p style={{margin: '5px 0'}}><strong>가격:</strong> {hotel.price} 원</p>
                            <p style={{margin: '5px 0'}}><strong>방 타입:</strong> {hotel.roomMember}인실</p>
                            <p style={{margin: '5px 0'}}>
                                <Link
                                    to={`/hotel/${hotel.id}`}
                                    style={{color: '#3498db', textDecoration: 'none', fontWeight: 'bold'}}
                                >
                                    호텔 상세 페이지
                                </Link>
                            </p>
                            <button
                                onClick={() => handleCancel(hotel.id)}
                                style={{
                                    padding: '10px 15px',
                                    color: 'white',
                                    backgroundColor: '#d9534f',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                호텔 삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyHotelBySeller;
