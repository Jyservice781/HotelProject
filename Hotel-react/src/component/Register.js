import {Button, Col, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

let Register = () => {
    let navigate = useNavigate();

    let onSubmit = () => {
        navigate('/');
    }

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
        height: '30%',
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
                        <Form.Control placeholder="ID"/>
                    </Col>
                    <Col className={'mt-5 mb-5'}>
                        <Form.Control placeholder="PASSWORD"/>
                    </Col>
                    <Button onClick={onSubmit} className={'m-lg-3'}>회원가입</Button>
                    <Button onClick={goBack}>뒤로가기</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Register;
