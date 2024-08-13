// Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post('http://localhost:8080/user/logOutSuccess', {}, { withCredentials: true });
                // 로그아웃 성공 후 로그인 페이지로 리디렉션
                navigate('/login');
            } catch (error) {
                console.error("Logout error", error);
            }
        };

        logout();
    }, [navigate]);

    return <div>로그아웃 중...</div>;
};

export default Logout;
