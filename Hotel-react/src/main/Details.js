import Header from "../component/Header";
import Footer from "../component/Footer";
import {Button, Col, Container, Image} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FaStar} from "react-icons/fa";
import axios from "axios";

let Details = () => {
    let profileListStyle = {
        listStyleType: 'none',
        width: '100%',
        height: '260px',
        borderTop: '1px solid #999',
        borderBottom: '1px solid #999'
    }

    let listStyle = {
        listStyleType: 'none',
        width: '100%',
        borderTop: '1px solid #999',
        borderBottom: '1px solid #999',
        paddingTop: '15px',
        paddingBottom: '15px'
    }

    let size = {
        width: '100%',
        height: '300px',
    }

    let params = useParams()
    let hotelId = parseInt(params.hotelId) || 1
    let navigate = useNavigate();

    let [data, setData] = useState({totalScore: 0, totalCount: 0})
    let averageStar = () => {
        let average = data.totalScore / data.totalCount
        let ARRAY = [0, 1, 2, 3, 4]
        return (
            <span>
                {ARRAY.map((element) => (
                    <FaStar
                        key={element}
                        size="16"
                        color={element < average ? "#ffc107" : "#e4e5e9"}
                    />
                ))}{' '}
                {average.toFixed(1)}
            </span>
        )
    }
    useEffect(() => {
        let selectList = async () => {
            let resp = await axios.get(`http://localhost:8080/reply/selectList/${hotelId}`);
            if (resp.status === 200) {
                setData({
                    totalScore: resp.data.totalScore,
                    totalCount: resp.data.totalCount
                });
            }
        };
        selectList();
    }, [hotelId]);

    let moveToPage = () => {
        navigate('/reply/replyList/' + hotelId)
    }
    return (
        <>
            <Header/>
            <Container className={'justify-content-center'}>
                <section>
                    <div id={'hotelProfile'} className={'d-flex align-items-center'}>
                        <div>
                            <img src={process.env.PUBLIC_URL + '/logo_img.png'} alt="로고임 사진 바꿔야함" style={{
                                width: '280px',
                                height: 'auto'
                            }}/>
                        </div>
                        <ul style={profileListStyle}>
                            <li className={'p-2'}>title</li>
                            <li className={'p-2'}>content</li>
                            <li className={'p-2'}>
                                <span>review Score</span>
                                <p>해당 평점 관련 후기 클릭</p>
                            </li>
                            <li className={'p-2'}>
                                {/* 해당 부분은 리스트가 아니라 버튼으로 교체 예정*/}
                                <Button>버튼1</Button>
                                <Button>장바구니</Button>
                                <Button>예약하기</Button>
                            </li>
                        </ul>
                    </div>
                    <aside>
                        {/*    review     */}
                        <div style={{marginTop: '20px', marginBottom: '20px'}}>
                            <h3>최고의 경험이었습니다!!</h3>
                            <p>평점: {averageStar()} </p>
                            <Button onClick={moveToPage} size="sm">호텔리뷰 더보기</Button>
                        </div>
                    </aside>
                    <article>
                        {/* 상세보기 버튼 만들기*/}
                        <ul style={listStyle}>
                            <li className={'d-flex justify-content-center align-items-center'}>
                                <Button>상세보기</Button>
                                <Button className={'mx-4'}>개요</Button>
                            </li>
                        </ul>
                    </article>
                    <figure>
                        {/*  상세보기 보여줄 것  -> 사용자가 이미지를 올리는게 추가 될때 그 값을 받아서 늘어나야 함. */}
                        <Container className={'d-flex flex-column mb-3 justify-content-center'}>
                            <Col xd={8} ms={6}>
                                <Image src="holder.js/171x180" thumbnail style={size}/>
                            </Col>
                            <Col xd={8} ms={6}>
                                <Image src="holder.js/171x180" thumbnail style={size}/>
                            </Col>
                            <Col xd={8} ms={6}>
                                <Image src="holder.js/171x180" thumbnail style={size}/>
                            </Col>
                            <Col xd={8} ms={6}>
                                <Image src="holder.js/171x180" thumbnail style={size}/>
                            </Col>
                        </Container>
                    </figure>
                </section>
            </Container>
            <Footer/>
        </>
    )
}

export default Details;