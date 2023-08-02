import React from 'react';
import {Box, Container, ThemeColor, exerciseName, NavigationBar} from "../../../UI/UIPackage";
import {Doughnut} from "react-chartjs-2";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {useLocation} from "react-router-dom";

const DoughnutBox = styled.div`
  width: 205px;
  height: 205px;
  background-color: ${ThemeColor.importantColor};
  margin: 15px 15px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 20px;
`


const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${ThemeColor.divColor};
  width: 130px;
  height: 60px;
  border-radius: 16px;
  margin: 15px 0 0 0;
`
const Label=styled.h4`
  margin-left: 20px;
  margin-bottom: 5px;
`

const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PTitle = styled.p`
  font-weight: bold;
  margin-left: 12px;
`
const PContent = styled.p`
  margin-left: 10px;
  margin-top: -10px;
`

const ExerciseData = ({data, exercise}) => {
    const percent = data / 100
    const chartData = {
        labels: [{exercise}],
        datasets: [
            {
                data: [percent, 1 - percent],
                backgroundColor: ['hotpink', 'rgba(0, 0, 0, 0)']
            }
        ]
    }
    const options = {
        cutoutPercentage: 30,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            arc: {
                borderWidth: 130,
                borderColor: 'transparent',
                borderRadius: 50,
            },
        },
    }
    const backgroundData = {
        labels: ['none'],
        datasets: [
            {
                data: [100, 0],
                backgroundColor: ['rgba(204, 51, 128, 0.2)', 'rgba(0, 0, 0, 0)']
            },
        ]
    }
    const backgroundOptions = {
        cutoutPercentage: 30,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            arc: {
                borderWidth: 130,
                borderColor: 'transparent',
            },
        },
    };
    return (
        <DoughnutBox>
            <span style={{position: 'relative', zIndex: '1', left: '150px'}}>
                {<Doughnut data={backgroundData} options={backgroundOptions}/>}
            </span>
            <span style={{position: 'relative', zIndex: '2', left: '-150px'}}>
                {<Doughnut data={chartData} options={options}/>}
            </span>
        </DoughnutBox>
    )
}
const EachExercise = ({dDay, goal, attain}) => {
    const year = dDay.substring(2, 4)
    const month = dDay.substring(5, 7)
    const day = dDay.substring(8, 10)
    const label = goal.label
    const cycle = goal.cycle
    const goalNum = goal.number
    const percent = attain / goalNum * 100

    return (
        <Box>
            <Label>{exerciseName[label]}</Label>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ExerciseData data={percent} exercise='운동 1'/>
                <div>
                    <InfoBox>
                        <DivStyle>
                            <PTitle>목표 날짜</PTitle>
                            <PContent>{year}년 {month}월 {day}일</PContent>
                        </DivStyle>
                    </InfoBox>
                    <InfoBox>
                        <DivStyle>
                            <PTitle>달성률</PTitle>
                            <PContent>{Math.round(percent)}%</PContent>
                        </DivStyle>
                        <DivStyle>
                            <PTitle>주기</PTitle>
                            <PContent>{cycle}</PContent>
                        </DivStyle>
                    </InfoBox>
                    <InfoBox>
                        <DivStyle>
                            <PTitle>목표치</PTitle>
                            <PContent>{goalNum}회</PContent>
                        </DivStyle>
                        <DivStyle>
                            <PTitle>달성량</PTitle>
                            <PContent>{attain}회</PContent>
                        </DivStyle>
                    </InfoBox>
                </div>
            </div>
        </Box>
    )
}

function Current(props) {
    const name = useSelector((state) => state.name)
    const dDay = useSelector((state) => state.dDay)
    const goals = useSelector((state) => state.goals)
    // console.log(dDay, goals)
    const attain = 2
    return (
        <Container>
            <h1>{name}님의 현재 운동</h1>
            {
                goals.map((goal, index) => (
                    <EachExercise key={index} dDay={dDay} goal={goal} attain={attain}/>
                ))
            }
            <NavigationBar/>
        </Container>
    );
}

export default Current;
