import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled, {keyframes} from "styled-components";
import {Link} from "react-router-dom";


import {
    Button,
    Container,
    NavigationBar,
    UserBox,
    ThemeColor,
    UserBoxSize,
    InfoBox,
    rainbowAnimation
} from "../UI/UIPackage";
import {USER_SETTING} from '../api'

import {getUserFullInfo, logout} from "../state/userState";

//아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {GET_USER_FULL_INFO} from "../api";

const RainbowDiv = styled.div`
  border: 2px solid;
  width: 300px;
  border-radius: 16px;
  margin-top: 20px;
  padding: 0 0 10px 10px;
  background-color: ${ThemeColor.divColor};
  animation: ${rainbowAnimation} 5s linear infinite;

  > :nth-child(1) {
    margin: 0;
    padding: 10px 0 0 10px;
    font-size: 12px;
    font-weight: bold;
  }

  > :nth-child(n+2) {
    font-size: 20px;
    padding: 10px 0 0 10px;
    margin: -5px 0 0 0;
    font-weight: bold;
  }
`;

function Account(props) {


    const dispatch = useDispatch();
    const {
        name,
        email,
        age,
        area,
        weight,
        height,
        exercise,
        wishList,
        followers,
        following,
    } = useSelector((state) => state);
    const stringWeight = weight.toString()
    const stringHeight = height.toString()

    async function setLogout() {
        dispatch(
            logout()
        )
    }

    return (
        <Container>
            <h1>유저 정보</h1>
            <div style={{
                borderRadius: '20px',
                backgroundColor: `${ThemeColor.containerColor}`,
                width: '80%',
                margin: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'

            }}>
                <div style={{width: '70%', display: 'flex', justifyContent: 'space-between'}}>

                    {name &&
                        <UserBox name={name} email={email} size={UserBoxSize.large}/>
                    }
                    <Link to={USER_SETTING} style={{textDecoration: 'none', color: 'black'}}>

                        <FontAwesomeIcon icon={faGear} spin style={{fontSize: '25px', marginTop: '10px'}}/>
                    </Link>
                </div>

                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

                    <InfoBox>
                        <p>팔로워</p>
                        <p>{followers ? followers && followers.length : '0'}명</p>
                    </InfoBox>

                    <InfoBox>
                        <p>팔로잉</p>
                        <p>{following ? following && following.length : '0'}명</p>
                    </InfoBox>
                    <InfoBox>
                        <p>나이</p>
                        <p>{age}</p>
                    </InfoBox>
                    <InfoBox>
                        <p>지역</p>
                        <p>{area}</p>
                    </InfoBox>
                    <InfoBox>
                        <p>몸무게</p>
                        {stringWeight.includes('이상') || stringWeight.includes('이하') ? (
                            <p>
                                {stringWeight.substring(0, 2)}
                                <span style={{fontSize: '15px'}}>
                                    kg {stringWeight.includes('이상') ? '이상' : '이하'}
                                </span>
                            </p>
                        ) : (
                            <p>
                                {weight}kg
                            </p>
                        )}
                    </InfoBox>
                    <InfoBox>
                        <p>키</p>
                        {stringHeight.includes('이상') || stringHeight.includes('이하') ? (
                                <p>
                                    {stringHeight.substring(0, 3)} <span style={{fontSize: '15px'}}>
                                    cm {stringHeight.includes('이상') ? '이상' : '이하'}
                                    </span>
                                </p>
                            )
                            :
                            (
                                <p>
                                    {height}<span style={{fontSize: '15px'}}>cm</span>
                                </p>
                            )
                        }
                    </InfoBox>
                </div>
                <RainbowDiv>
                    <p>주로 하는 운동</p>
                    <p>{exercise}</p>
                </RainbowDiv>
                <RainbowDiv>
                    <p>해결하고싶은 고민</p>

                    {
                        wishList.map((item, index) => {
                                return (
                                    <p key={index}>{index + 1}.&nbsp;{item}</p>
                                )
                            }
                        )
                    }

                </RainbowDiv>


            </div>
            <Link to={'/'}>
                <Button onClick={setLogout}>
                    로그아웃
                </Button>
            </Link>

            <NavigationBar/>


        </Container>
    );
}

export default Account;
