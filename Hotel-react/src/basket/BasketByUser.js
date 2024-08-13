import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

const BasketShowOne = (props) => {
    // 우선순위: props로 받은 userid가 있으면 사용하고, 없으면 useParams로 받은 userid를 사용
    const { userid: paramUserId } = useParams(); // URL 파라미터로 받은 userid
    const userid = props.userid || paramUserId; // props로 받은 userid가 우선

    const [baskets, setBaskets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // console.log("선택한 hotelid: ",userid);
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

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류: {error}</p>;

    return (
        <div>
            <h1>장바구니</h1>
            <ul>
                {baskets.map((basket, index) => (
                    <li key={basket.id}>
                        <p>호텔 : {basket.name}</p>
                        <p>판매자ID: {basket.sellerId}</p>
                        <p>가격: {basket.price}</p>
                        <Link to={`/`}>삭제</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BasketShowOne;
