import {Button, Col, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

let Register = () => {
    let navigate = useNavigate();
    let [inputs, setInputs] = useState({
        username: '',
        password: '',
        nickname: ''
    });

    let onChange = (e) => {
        let {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    let onSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("username", inputs.username);
        formData.append("password", inputs.password);
        formData.append("nickname", inputs.nickname);

        try {
            let response = await axios({
                url: 'http://localhost:8080/user/register',
                method: 'POST',
                data: formData
            });

            if (response.status === 200 && response.data.result === 'success') {
                navigate('/');
            } else {
                alert('회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error("There was an error with the registration:", error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    let registerStyle = {
        width: '40%',
        height: '300px'

    }
    let wrapStyle = {
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
        width:'50%',
        height: '40%',
        backgroundColor: '#439798',
        padding:'20px 30px 20px 30px',
        borderRadius: '40px',
    }


    let goBack = () => {
        navigate(-1)
    }

    return (
        <div style={wrapStyle}>
            <Container style={registerStyle} className={"justify-content-md-center"}>
                <Form className={"align-items-center mt-5"}>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="ID"
                            name="username"
                            value={inputs.username}
                            onChange={onChange}
                        />
                    </Col>
                    <Col className={'mt-5 mb-5'}>
                        <Form.Control
                            type="password"
                            placeholder="PASSWORD"
                            name="password"
                            value={inputs.password}
                            onChange={onChange}
                        />
                    </Col>
                    <Col className={'mt-4'}>
                        <Form.Control
                            type="text"
                            placeholder="Nickname"
                            name="nickname"
                            value={inputs.nickname}
                            onChange={onChange}  // 닉네임 입력 필드 추가
                        />
                    </Col>
                    <Button onClick={onSubmit} className={'m-lg-3'}>회원가입</Button>
                    <Button onClick={goBack}>뒤로가기</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Register;