import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const AdminShowUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSellers, setShowSellers] = useState(true); // 상태를 추가하여 판매자/일반 사용자 토글

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/admin/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("이 사용자를 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/admin/user/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            alert("사용자 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        const roleValue = newRole === "role_seller" ? 2 : 3;

        try {
            const response = await fetch(`http://localhost:8080/admin/user/${userId}/${roleValue}`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setUsers(users.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            alert("등급 수정 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const guests = users.filter(user => user.role === "role_customer");
    const sellers = users.filter(user => user.role === "role_seller");

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>회원 목록</h1>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    onClick={() => setShowSellers(true)}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: showSellers ? '#3498db' : '#ddd',
                        color: showSellers ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    판매자
                </button>
                <button
                    onClick={() => setShowSellers(false)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: !showSellers ? '#3498db' : '#ddd',
                        color: !showSellers ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    일반 사용자
                </button>
            </div>

            {showSellers && sellers.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>판매자 관리</h2>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                        {sellers.map((user) => (
                            <li key={user.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                <h3 style={{ marginBottom: '10px' }}>사용자 : {user.username}</h3>
                                <p style={{ marginBottom: '8px' }}>닉네임 : {user.nickname}</p>
                                <p style={{ marginBottom: '8px' }}>등급 :
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        <option value="role_seller">판매자</option>
                                        <option value="role_customer">일반 사용자</option>
                                    </select>
                                </p>
                                <Link
                                    to={`/admin/userpage/${user.id}`}
                                    style={{ marginRight: '10px', textDecoration: 'none', color: '#3498db' }}
                                >
                                    판매자 정보 보기
                                </Link>
                                <Link
                                    to={`/user/myhotel/${user.id}`}
                                    style={{ marginRight: '10px', textDecoration: 'none', color: '#3498db' }}
                                >
                                    판매중인 호텔 보기
                                </Link>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    style={{ marginRight: '10px', padding: '5px 10px', border: 'none', borderRadius: '4px', backgroundColor: '#e74c3c', color: '#fff', cursor: 'pointer' }}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!showSellers && guests.length > 0 && (
                <div>
                    <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>일반 사용자 관리</h2>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                        {guests.map((user) => (
                            <li key={user.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                <h3 style={{ marginBottom: '10px' }}>사용자 : {user.username}</h3>
                                <p style={{ marginBottom: '8px' }}>닉네임 : {user.nickname}</p>
                                <p style={{ marginBottom: '8px' }}>등급 :
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        <option value="role_customer">일반 사용자</option>
                                        <option value="role_seller">판매자</option>
                                    </select>
                                </p>
                                <Link
                                    to={`/admin/userpage/${user.id}`}
                                    style={{ marginRight: '10px', textDecoration: 'none', color: '#3498db' }}
                                >
                                    고객 정보 보기
                                </Link>
                                <Link
                                    to={`/admin/userpage/${user.id}`}
                                    style={{ marginRight: '10px', textDecoration: 'none', color: '#3498db' }}
                                >
                                    구매 내역 보기
                                </Link>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    style={{ padding: '5px 10px', border: 'none', borderRadius: '4px', backgroundColor: '#e74c3c', color: '#fff', cursor: 'pointer' }}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminShowUserList;
