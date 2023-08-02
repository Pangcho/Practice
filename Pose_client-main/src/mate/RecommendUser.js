import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {GET_RECOMMEND_USER} from '../api'
import {Button, Loading, ThemeColor, UserBox, UserBoxSize} from "../UI/UIPackage";
import styled from "styled-components";

import {FOLLOW_USER} from "../api";

const UserInfoBox = styled.div`
  width: 320px;
  background-color: ${ThemeColor.divColor};
  border-radius: 16px;
  padding: 10px 15px 0 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Detail = styled.p`
  background-color: ${ThemeColor.importantColor};
  border-radius: 10px;
  margin-right: 5px;
  padding: 5px;
`

const FollowButton=()=>{
    return (
        <Button>
            팔로우
        </Button>
    )
}
const RecommendUser = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = async (userIdToFollow) => {
        setFollowLoading(true)
        try {
            const token = sessionStorage.getItem('jwt'); // Assuming the JWT token is stored in localStorage
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            const response = await axios.post(FOLLOW_USER,
                {userIdToFollow},
                {headers: headers},
            )
            if (response.status === 200) {
                setIsFollowing(true);
            }
            setFollowLoading(false)
        } catch (error) {
            console.error(error);
            setFollowLoading(false)
        }
    };


    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(GET_RECOMMEND_USER);
            setUsers(response.data);
            // console.log(response.data)
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, []);


    return (
        <div>
            <h2>추천 유저</h2>
            <div style={{display:'flex', justifyContent:'center'}}>
                {isLoading && (<Loading/>)}
            </div>


            {users.map(user => (
                <UserInfoBox key={user._id}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <UserBox name={user.name} email={user.email} size={UserBoxSize.small}/>
                        <div style={{display: 'flex'}}>
                            <Detail>{user.sex}</Detail>
                            <Detail>{user.area}</Detail>
                            <Detail>{user.age}</Detail>
                        </div>
                    </div>
                    <Button
                        style={{width: '89px', fontSize: UserBoxSize.xSmall}}
                        onClick={() => handleFollow(user._id)}>
                        {isFollowing ? `팔로잉` : '팔로우'}
                    </Button>

                </UserInfoBox>
            ))}
        </div>
    );
};

export default RecommendUser;
