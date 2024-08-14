import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserInfo = () => {
    const { userid } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/${userid}`);
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userid]);

    if (loading) return <p style={{ textAlign: 'center', fontSize: '18px' }}>로딩 중...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>오류: {error}</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            {user ? (
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>사용자 정보</h2>
                    <p style={{ fontSize: '16px', marginBottom: '10px' }}><strong>이름:</strong> {user.username}</p>
                    <p style={{ fontSize: '16px', marginBottom: '10px' }}><strong>역할:</strong> {user.role}</p>
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>사용자 정보를 찾을 수 없습니다.</p>
            )}
        </div>
    );
}

export default UserInfo;
