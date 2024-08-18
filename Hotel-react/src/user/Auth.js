import {Container, Table, FormControl, Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Header from "../component/Header";

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

    let wrapStyle = {
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
        width:'50%',
        height: '40%',
        background: '#ffffff',
        boxShadow:  '15px 15px 45px #bdbdbd, -15px -15px 45px #ffffff',
        margin: '0px',
        padding:'20px 30px 20px 30px',
        borderRadius: '40px',
    }

    let loginStyle = {
        width: '50%',
        height: '40%'
    }

    const btnStyle = {
        padding: '10px 15px',
        backgroundColor: '#439798',
        color: 'white',
        border: '1px solid white',
        borderRadius: '5px',
        fontSize: '14px',
        textDecoration: 'none',
    }

    return (
       <div style={wrapStyle}>
           <Container style={loginStyle}>
               <form onSubmit={onSubmit}>
                   <Table striped hover bordered>
                       <thead>
                       <tr>
                           <td colSpan={2}>로그인</td>
                       </tr>
                       </thead>
                       <tbody>
                       <tr>
                           <td style={{fontSize:'15px', margin: '2px'}}>아이디</td>
                           <td><FormControl type={'text'}
                                            name={'username'}
                                            value={inputs.username}
                                            onChange={onChange}/>
                           </td>
                       </tr>
                       <tr>
                           <td style={{fontSize:'15px',margin: '2px'}}>비밀번호</td>
                           <td><FormControl type={'password'}
                                            name={'password'}
                                            value={inputs.password}
                                            onChange={onChange}/>
                           </td>
                       </tr>
                       <tr>
                           <td colSpan={2}>
                               <Button type={'submit'} style={btnStyle}>로그인</Button>
                               <Link to={`/register`} type={'button'} style={btnStyle}>회원가입</Link>
                           </td>
                       </tr>
                       </tbody>
                   </Table>
               </form>
           </Container>
       </div>
    )


}

export default Auth;