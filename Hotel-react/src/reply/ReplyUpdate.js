import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {FaStar} from "react-icons/fa";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";

let ReplyUpdate = () => {
    let [inputs, setInputs] = useState({
        id: '',
        hotelId: '',
        customerId: '',
        score: '',
        title: '',
        content: ''
    })
    let params = useParams()
    let id = params.id

    let location = useLocation()
    let userInfo = location.state?.userInfo || {id: null}
    let navigate = useNavigate()

    let moveToNext = () => {
        let hotelId = parseInt(inputs.hotelId)
        navigate('/reply/replyList/' + hotelId, {state: {userInfo: userInfo}})
    }

    let onSubmit = async (e) => {
        e.preventDefault()
        try {
            let response = await axios.post('http://localhost:8080/reply/update', inputs, {
                withCredentials: true
            })
            console.log("Response data: ", response.data)
            if (response.status === 200) {
                moveToNext()
            }
        } catch (error) {
            console.error("Error reply: ", error)
        }
    }

    let ARRAY = [0, 1, 2, 3, 4];
    let [score, setScore] = useState([false, false, false, false, false])
    let starScore = (index) => {
        let newScore = ARRAY.map((_, i) => i <= index);
        setScore(newScore);
        setInputs({
            ...inputs,
            score: index + 1
        })
    }

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        let getUpdate = async () => {
            let response = await axios.get('http://localhost:8080/reply/selectOne/' + id, {
                withCredentials: true
            })
            if (response.status === 200) {
                let replyData = response.data.replyOne
                setInputs(prev => ({
                    ...prev,
                    id: replyData.id,
                    hotelId: parseInt(replyData.hotelId),
                    customerId: replyData.customerId,
                    score: replyData.score,
                    title: replyData.title,
                    content: replyData.content
                }))
                setScore(ARRAY.map((_, i) => i < replyData.score))
            }
        }
        getUpdate()
    }, [id]);

    let noneBullet = {
        listStyleType: 'none',
        padding: 0,
        margin: 0
    }

    return (
        <Container className={"mt-3"}>
            <form onSubmit={onSubmit}>
                <ul>
                    <div style={{fontWeight:'bold'}}>[리뷰 수정하기]</div>
                    <li>호텔은 만족하셨나요?</li>
                    <li style={noneBullet}>
                        {ARRAY.map((el, index) => (
                            <FaStar key={index} size="24"
                                    onClick={() => starScore(index)}
                                    color={score[index] ? "#ffc107" : "#e4e5e9"}
                                    style={{cursor: 'pointer'}}/>
                        ))}
                    </li>
                    <li>제목</li>
                    <li style={noneBullet}>
                        <FormControl type={'text'} name={'title'} value={inputs.title} onChange={onChange}/>
                    </li>
                    <li>내용</li>
                    <li style={noneBullet}>
                    <textarea name={'content'} className={'form-control'} value={inputs.content}
                              onChange={onChange}></textarea>
                    </li>
                    <Button type={'submit'} style={{margin: '15px 0'}}>수정</Button>
                </ul>
            </form>
        </Container>
    )
}

export default ReplyUpdate