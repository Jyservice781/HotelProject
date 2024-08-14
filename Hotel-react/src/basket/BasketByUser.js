import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const BasketByUser = (props) => {
    const { userid: paramUserId } = useParams();
    const userid = props.userid || paramUserId;

    const [baskets, setBaskets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/basket/${userid}`);
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                const data = await response.json();
                setBaskets(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBasket();
    }, [userid]);

    if (loading) return <p style={{ textAlign: 'center' }}>로딩 중...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>오류: {error}</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>장바구니</h1>

            {baskets.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>장바구니가 비었습니다.</p>
            ) : (
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {baskets.map((basket) => (
                        <li key={basket.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                            <h2 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>호텔 : {basket.name}</h2>
                            <p style={{ margin: '5px 0' }}>판매자 ID: {basket.sellerId}</p>
                            <p style={{ margin: '5px 0' }}>가격: {basket.price} 원</p>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BasketByUser;
