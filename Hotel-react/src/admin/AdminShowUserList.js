import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const AdminShowUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            // 삭제된 사용자 제외하고 상태 업데이트
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            alert("사용자 삭제 중 오류가 발생했습니다.");
        }
    };
    const handleRoleChange = async (userId, newRole) => {
        // role 값을 숫자로 변환
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
        <div>
            <h1>회원목록</h1>
            {sellers.length > 0 && (
                <div>
                    <h2>판매자 관리</h2>
                    <ul>
                        {sellers.map((user) => (
                            <li key={user.id}>
                                <h3>사용자 : {user.username}</h3>
                                <p>닉네임 : {user.nickname}</p>
                                <p>등급 :
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    >
                                        <option value="role_seller">판매자</option>
                                        <option value="role_customer">일반 사용자</option>
                                    </select>
                                </p>
                                <button onClick={() => handleDelete(user.id)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {guests.length > 0 && (
                <div>
                    <h2>일반 사용자 관리</h2>
                    <ul>
                        {guests.map((user) => (
                            <li key={user.id}>
                                <h3>사용자 : {user.username}</h3>
                                <p>닉네임 : {user.nickname}</p>
                                <p>등급 :
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    >
                                        <option value="role_customer">일반 사용자</option>
                                        <option value="role_seller">판매자</option>
                                    </select>
                                </p>
                                <Link to={`/admin/user/${user.id}`}>상세보기</Link>
                                <button onClick={() => handleDelete(user.id)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminShowUserList;
