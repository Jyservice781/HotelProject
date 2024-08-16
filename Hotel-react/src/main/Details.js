import Header from "../component/Header";
import Footer from "../component/Footer";
import { Button, Col, Container, Image } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

// 날짜 포맷 함수
const modifyDate = (dateString) => {
    let date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    }).replace('.', '년 ').replace('.', '월 ').replace('.', '일');
};

// 방 종류 텍스트 반환 함수
const getRoomMemberText = (roomMember) => {
    switch (roomMember) {
        case 1:
            return '싱글룸';
        case 2:
            return '더블룸';
        case 3:
            return '트윈룸';
        case 4:
            return '트리플룸';
        case 5:
            return '스위트룸';
        default:
            return '알 수 없음';
    }
};

// 룸 타입 텍스트 반환 함수
const getRoomTypeText = (roomType) => {
    switch (roomType) {
        case 1:
            return '스탠다드';
        case 2:
            return '슈페리어';
        case 3:
            return '디럭스';
        case 4:
            return '이그제큐티브';
        default:
            return '알 수 없음';
    }
};

const Details = () => {
    const [data, setData] = useState({});
    const [images, setImages] = useState([]);
    const [replyData, setReplyData] = useState({ totalScore: 0, totalCount: 0 });
    const params = useParams();
    const id = parseInt(params.id);
    const location = useLocation();
    const { userInfo } = location.state || {};
    const navigate = useNavigate();

    // 이미지 섹션과 개요 섹션을 참조하기 위한 refs
    const imagesRef = useRef(null);
    const overviewRef = useRef(null);

    // 스타일 설정
    const profileListStyle = {
        listStyleType: 'none',
        width: '100%',
        height: '260px',
        borderTop: '1px solid #999',
        borderBottom: '1px solid #999'
    };

    const listStyle = {
        listStyleType: 'none',
        width: '100%',
        borderTop: '1px solid #999',
        borderBottom: '1px solid #999',
        paddingTop: '15px',
        paddingBottom: '15px'
    };

    // 별점 평균 계산 함수
    const averageStar = () => {
        const average = replyData.totalCount > 0 ? replyData.totalScore / replyData.totalCount : 0; // Zero division protection
        const ARRAY = [0, 1, 2, 3, 4];
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
        );
    };
    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const hotelResp = await axios.get(`http://localhost:8080/hotel/showOne/${id}`, {
                    withCredentials: true
                });
                if (hotelResp.status === 200) {
                    const hotelData = hotelResp.data;
                    setData({
                        ...hotelData.hotelDTO,
                        startEntry: hotelData.startDate,
                        endEntry: hotelData.endDate
                    });

                    const imagesResp = await axios.get(`http://localhost:8080/hotel/uploads/${hotelData.hotelDTO.id}/${hotelData.hotelDTO.roomNumber}`, {
                        withCredentials: true
                    });
                    if (imagesResp.status === 200) {
                        setImages(imagesResp.data);
                    }
                }
            } catch (e) {
                console.error('호텔 정보 가져오기 오류:', e);
            }
        };

        fetchData();
    }, [id]);

    // 댓글 데이터 가져오기
    useEffect(() => {
        const selectList = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/reply/selectList/${id}`);
                if (resp.status === 200) {
                    setReplyData({
                        totalScore: resp.data.totalScore,
                        totalCount: resp.data.totalCount
                    });
                }
            } catch (error) {
                console.error('댓글 데이터 가져오기 오류:', error);
            }
        };
        selectList();
    }, [id]);

    // 페이지 이동 함수
    const moveToPage = () => {
        navigate('/reply/replyList/' + id);
    };

    const goBack = () => {
        navigate('/', { state: { userInfo } });
    };

    const onUpdate = () => {
        navigate('/hotel/update/' + id, { state: { userInfo } });
    };

    const onLogout = async () => {
        const response = await axios.post('http://localhost:8080/user/logOut', {}, {
            withCredentials: true
        });

        if (response.status === 200) {
            navigate('/');
        }
    };

    const onDelete = async () => {
        const response = await axios.get(`http://localhost:8080/hotel/delete/${id}`, {
            withCredentials: true
        });

        if (response.status === 200) {
            navigate('/', { state: { userInfo } });
        }
    };

    const isAdmin = userInfo?.role === 'role_admin';
    const firstImage = images.length > 0 ? `http://localhost:8080/hotel/uploads/${data.id}/${data.roomNumber}/${images[0]}` : process.env.PUBLIC_URL + '/logo_img.png';

    // 상세보기 버튼 클릭 시 이미지 섹션으로 스크롤 이동
    const scrollToImages = () => {
        if (imagesRef.current) {
            imagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 개요 버튼 클릭 시 개요 섹션으로 스크롤 이동
    const scrollToOverview = () => {
        if (overviewRef.current) {
            overviewRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Header userInfo={userInfo} />
            <Container className="mt-3">
                <section>
                    <div id="hotelProfile" className="d-flex align-items-center mb-3">
                        <div className="me-3">
                            <img
                                src={firstImage}
                                alt="호텔 이미지"
                                style={{ width: '280px', height: 'auto' }}
                            />
                        </div>
                        {data && (
                            <ul style={profileListStyle}>
                                <li className={'p-2'}>호텔이름: {data.name}</li>
                                <li className={'p-2'}>{data.shortContent}</li>
                                <li className={'p-2'}>{modifyDate(data.startEntry)} ~ {modifyDate(data.endEntry)}</li>
                                <li className={'p-2'}>주소: {data.address}</li>
                                <li className={'p-2'}>가격: {data.price}</li>
                                <li className={'p-2'}>
                                    <Button>버튼1</Button>
                                    <Button>장바구니</Button>
                                    <Button>예약하기</Button>
                                </li>
                            </ul>
                        )}
                    </div>
                    <aside>
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <h3>최고의 경험이었습니다!!</h3>
                            <p>평점: {averageStar()} </p>
                            <Button onClick={moveToPage} size="sm">호텔리뷰 더보기</Button>
                        </div>
                    </aside>
                    <article>
                        <ul style={listStyle}>
                            <li className={'d-flex justify-content-center align-items-center'}>
                                <Button onClick={scrollToImages}>상세보기</Button>
                                <Button onClick={scrollToOverview} className={'mx-4'}>개요</Button>
                            </li>
                        </ul>
                    </article>
                    <figure ref={imagesRef}>
                        <Container className={'d-flex flex-column mb-3 justify-content-center'}>
                            {images.map((filename, index) => (
                                <Col xs={12} md={6} lg={4} key={index} className="mb-2">
                                    <Image
                                        src={`http://localhost:8080/hotel/uploads/${data.id}/${data.roomNumber}/${filename}`}
                                        alt={`호텔 이미지 ${filename}`}
                                        fluid
                                    />
                                </Col>
                            ))}
                        </Container>
                    </figure>
                    <article ref={overviewRef}>
                        <ul style={profileListStyle}>
                            <li className={'p-2'}>{data.roomNumber}</li>
                            <li className={'p-2'}>{getRoomMemberText(data.roomMember)}</li>
                            <li className={'p-2'}>{getRoomTypeText(data.roomType)}</li>
                            <li className={'p-2'}>{data.content}</li>
                        </ul>
                    </article>
                    {isAdmin && (
                        <div className="mb-3">
                            <Button onClick={onDelete}>삭제하기</Button>
                        </div>
                    )}
                    {data.sellerId === userInfo?.id && !isAdmin && (
                        <div className="mb-3">
                            <Button onClick={onUpdate}>수정하기</Button>
                            <Button onClick={onDelete} className="ms-2">삭제하기</Button>
                        </div>
                    )}
                    <div className="text-center">
                        <Button onClick={goBack}>뒤로 가기</Button>
                    </div>
                </section>
            </Container>
            <Footer />
        </>
    );
};

export default Details;
