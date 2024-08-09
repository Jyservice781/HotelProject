import React from "react";
import styled from 'styled-components'
import {FaStar} from "react-icons/fa";

let UserProfile = ({data}) => {
    let ARRAY = [0,1,2,3,4]
    console.log(data)

    let modifyDate = (dateString) => {
        let date = new Date(dateString)
        return date.toLocaleDateString('ko-KR', {
            year : '2-digit',
            month : '2-digit'
        }).replace('.', '년').replace('.','월')
    }

    return(
        <CommentBody>
            <Profile>
                <UserImg src={data.profileImage} alt="User Image"/>
                <UserInfo>
                    <UserId>{data.customerId}</UserId>
                    {/*<UserName>{data.userName}</UserName>*/}
                    <UserStars>
                        {ARRAY.map((element) => (
                            <FaStar
                                key={element}
                                size="14"
                                color={element < data.score ? "#ffc107" : "#e4e5e9"}
                            />
                        ))}{' '}
                        {data.score}.0
                    </UserStars>
                    <UserDate>
                        {modifyDate(data.modifyDate)}
                    </UserDate>
                </UserInfo>
            </Profile>
            <UserComment>{data.content}</UserComment>
        </CommentBody>
    )
}

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserId = styled.h3`
  margin: 0;
`;

const UserName = styled.h3`
  margin: 0;
`;

const UserStars = styled.div`
  display: flex;
  align-items: center;
`;

const UserDate = styled.div`
  font-size: 12px;
  color: #888;
`;

const UserComment = styled.p`
  margin-top: 10px;
`;

export default UserProfile;
