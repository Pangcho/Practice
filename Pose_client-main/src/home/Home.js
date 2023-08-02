import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


import {GET_USER_FULL_INFO} from '../api'


import {getUserFullInfo, logout} from "../state/userState";

import {Container, UserBox, NavigationBar, UserBoxSize} from '../UI/UIPackage';

import CurrentExercise from "./widget/currentExercise/CurrentExercise";
import HomeRanking from "./widget/HomeRanking";
import StateOfMate from "./widget/StateOfMate";


const DecimalDay = () => {
    const [remainingTime, setRemainingTime] = useState(null);

    const dDay = useSelector((state) => state.dDay)
    const goalMonth = dDay?.substring(5, 7).replace(/^0+/, '');
    const goalDay = dDay?.substring(8, 10).replace(/^0+/, '');

    const calculateRemainingTime = () => {
        const targetDate = new Date(dDay)
        const now = new Date();

        // console.log(now)
        const timeDifference = targetDate - now;
        if (timeDifference <= 0) {
            setRemainingTime('이벤트가 종료되었습니다.');
            return;
        }

        const oneDay = 1000 * 60 * 60 * 24;
        const oneHour = 1000 * 60 * 60;
        const oneMinute = 1000 * 60;
        const oneSecond = 1000;

        const days = Math.floor(timeDifference / oneDay);
        const hours = Math.floor((timeDifference % oneDay) / oneHour);
        const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
        const seconds = Math.floor((timeDifference % oneMinute) / oneSecond);

        setRemainingTime(`${days}일 ${hours}시간 : ${minutes}분 : ${seconds}초 남음`);
    };

    useEffect(() => {
        calculateRemainingTime();

        // 1초마다 calculateRemainingTime 함수 호출 (1000ms = 1초)
        const intervalId = setInterval(calculateRemainingTime, 1000);

        // 컴포넌트가 언마운트될 때 인터벌 제거 (메모리 누수 방지)
        return () => clearInterval(intervalId);
    }, [dDay]);
    return(
        <>
            {dDay?(
                <>
                    {goalMonth && goalDay && <h3>{`${goalMonth}월 ${goalDay}일 까지`}</h3>}
                    {dDay && <div>{remainingTime}</div>}
                </>
            ):(
                <>

                </>
            )}

        </>
    )
}
function Home(props) {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();


    const {name, email}=useSelector((state)=>state)



    const getUserInfo = () => {
        const jwt = sessionStorage.getItem('jwt')
        const headers = {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
        setIsLoading(true)
        axios.get(GET_USER_FULL_INFO, {
            headers: headers
        }).then(response => {
            const { _id,name, email, age,area, weight, height, exercise, wishList, followers, following, goal } = response.data;

            const followersList=followers.length>0?followers:null
            const followingList=following.length>0?following:null
            const dDay = goal ? goal.dDay : null;
            const goals = goal ? goal.goals : null;
            dispatch(
                getUserFullInfo({
                    _id: _id,
                    name: name,
                    email: email,
                    age: age,
                    area: area,
                    weight: weight,
                    height: height,
                    exercise: exercise,
                    wishList: wishList,
                    followers: followersList,
                    following: followingList,
                    dDay: dDay,
                    goals: goals,
                })
            )
            console.log(response.data)
            setIsLoading(false)
        }).catch(error => console.error(error))
    }



    useEffect(() => {
        getUserInfo()
    }, [name])



    return (
        <Container>

            <h1>운동 메이트</h1>
            <DecimalDay/>
            <br/>
            <br/>

            {name &&
                <Link to={'/account'} style={{textDecoration: 'none', color: 'black'}}>
                    <div>
                        <UserBox name={name} email={email} size={UserBoxSize.large}/>
                    </div>
                </Link>
            }
            <br/>
            <br/>
            <StateOfMate/>
            <br/>
            <br/>
            <CurrentExercise name={name}/>
            <br/>
            <br/>
            <HomeRanking/>
            <br/>
            <br/>
            <NavigationBar/>

        </Container>
    );
}

export default Home;
//운동, 랭킹, 커뮤니티, 메이트, 계정