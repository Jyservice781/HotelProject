import {Container, Table, FormControl, Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

let Auth = () => {
    let [inputs, setInputs] = useState({
        username: '',
        password: ''
    })

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let navigate = useNavigate()

    let onSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("username", inputs.username)
        formData.append("password", inputs.password)

        let response = await axios({
            url:'http://localhost:8080/user/auth',
            method:'POST',
            data:formData,
            withCredentials: true
        })

        if(response.status === 200 && response.data.result === 'success'){
            let userInfo = {
                id: response.data.id,
                role: response.data.role,
                nickname: response.data.nickname
            }
            window.alert('환영합니다, '+userInfo.nickname+'님.');
            navigate('/', {state:{userInfo:userInfo}})
        }else{
            window.alert('존재하지 않는 회원입니다.');
        }
    }

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <td colSpan={2}>로그인</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><FormControl type={'text'}
                                         name={'username'}
                                         value={inputs.username}
                                         onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><FormControl type={'password'}
                                         name={'password'}
                                         value={inputs.password}
                                         onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type={'submit'}>로그인</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Link to={`/register`}>회원가입</Link>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>

    )


}

export default Auth;