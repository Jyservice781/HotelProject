import {Button, Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {FaStar} from "react-icons/fa";
import PaginationComponent from "../component/PaginationComponent";
import SortComponent from "../component/SortComponent";
import UserList from "../component/UserList";

let ReplyList = () => {
    let [data, setData] = useState({replyList: [], totalScore: 0, totalCount: 0})
    let [page, setPage] = useState(1)
    let [totalPages, setTotalPages] = useState(1)
    let [sortOption, setSortOption] = useState("latest")

    let navigate = useNavigate();
    let params = useParams()

    let userInfo = {id: 1}
    let hotelId = parseInt(params.hotelId) || 1

    let average = data.totalScore / data.totalCount

    let averageStar = () => {
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

    let profileImage = () => {
        let images = ['profile1.jpg', 'profile2.jpg', 'profile3.jpg', 'profile4.jpg']
        let randomIndex = Math.floor(Math.random() * images.length)
        return `/${images[randomIndex]}`
    }

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get(`http://localhost:8080/reply/selectList/${hotelId}`, {
                    params: {page: page, size: 5, sort: sortOption}
                });

            if (resp.status === 200) {
                let replyListWithImages = resp.data.replyList.map(reply => ({
                    ...reply,
                    profileImage: profileImage()
                }))
                setData({
                    replyList: replyListWithImages,
                    totalScore: resp.data.totalScore,
                    totalCount: resp.data.totalCount
                })
                setTotalPages(Math.ceil(resp.data.totalCount / 5))
            }
        }
        selectList();
    }, [hotelId, page, sortOption])

    let moveToWrite = () => {
        navigate(`/reply/write/` + hotelId)
    }
    let onUpdate = (id) => {
        navigate('/reply/update/' + id, {state: {userInfo: userInfo}})
    }
    let onDelete = (id) => {
        axios.get('http://localhost:8080/reply/delete/' + id, {
            withCredentials: true
        })
            .then(resp => {
                if (resp.status === 200) {
                    alert('삭제되었습니다.');
                    setData(prevData => ({
                        ...prevData,
                        replyList: prevData.replyList.filter(item => item.id !== id)
                    }));
                }
            })
            .catch(error => {
                alert('삭제 중 오류가 발생했습니다.');
            });
    };
    let deleteItem = (id) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            onDelete(id)
        }
    }

    let ListItem = ({reply}) => {
        return (
            <li>
                <UserList data={reply}
                          onUpdate={onUpdate}
                          onDelete={deleteItem}
                />
            </li>
        )
    }

    return (
        <Container fluid="md" className={'w-75'}>
            <div style={{fontWeight: 'bold'}}>
                [호텔명 : {data.replyList.length > 0 ? data.replyList[0].name : "호텔 이름 없음"}]
            </div>
            <div style={{fontWeight: 'bold'}}>
                [평균 별점 : {averageStar()}]
            </div>
            <div className='d-flex justify-content-end'>
                <SortComponent sortOption={sortOption} setSortOption={setSortOption}/>
            </div>
            <ul>
                {data.replyList.map(r => (
                    <ListItem reply={r} key={r.id}/>
                ))}
            </ul>
            <div className='d-flex justify-content-end'>
                <Button type={'button'} onClick={moveToWrite}>리뷰작성</Button>
            </div>
            <PaginationComponent page={page} totalPages={totalPages} setPage={setPage}/>
        </Container>
    )
}

export default ReplyList;
