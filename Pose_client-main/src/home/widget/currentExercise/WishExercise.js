import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container, NavigationBar, rainbowAnimation, ThemeColor} from "../../../UI/UIPackage";
import styled from "styled-components";


const Box = styled.div`
  background-color: ${ThemeColor.containerColor};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-bottom: 37px;
  width: 370px;
`

const WishList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${ThemeColor.importantColor};
  border-radius: 16px;
  padding: 0 20px;
  margin-bottom: 20px;
  margin-left: 15px;
  width: 300px;
  height: 41px;
`
const SelectButton = styled.button`
  width: 70px;
  height: 29px;
  border: none;
  border-radius: 16px;
  padding: 0 1px;
  font-family: 'Inter', sans-serif;
  background-color: ${ThemeColor.buttonColor};
  box-sizing: border-box;
  margin: 10px -12px 10px 0;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 2px solid;
    animation: ${rainbowAnimation} 5s linear infinite;
  }
`
const H4 = styled.h4`
  margin-left: 20px;
`

function ExerciseButton({onClick, selected}) {
    const buttonText = selected ? '취소' : '선택';

    return (
        <SelectButton
            onClick={onClick}
            style={{
                width: '70px',
                height: '29px',
                padding: '0 1px',
                margin: '10px -12px 10px 0',
                backgroundColor: selected ? ThemeColor.buttonColor : ThemeColor.disabledButtonColor
            }}
        >
            {buttonText}
        </SelectButton>
    );
}

function ExerciseItem({exercise, onClick, selected}) {
    return (
        <WishList>
            <p>{exercise}</p>
            <ExerciseButton onClick={onClick} selected={selected}/>
        </WishList>
    );
}

function WishExercise(props) {
    const navigate = useNavigate();


    const [selectedExercises, setSelectedExercises] = useState({
        squat: false,
        lunge: false,
        deadLift: false,
        plank: false,
        crunch: false,
        legRaise: false,
        pushUp: false,
        shoulderPress: false,
        dumbbellRow: false,
        hammerCurl: false
    });
    const trueExercises = Object.keys(selectedExercises).filter(exercise => selectedExercises[exercise]);
    const handleButtonClick = () => {
        navigate('/exercise/goal', {
            state:{
                selected:[...trueExercises]
            }
        });
    }
    const handleExerciseSelection = (exercise) => {
        setSelectedExercises(prevState => ({
            ...prevState,
            [exercise]: !prevState[exercise]
        }));
    };
    return (
        <Container>
            <h1>하고 싶은 운동 선택</h1>
            <Box>
                <H4>복근 운동</H4>
                <ExerciseItem exercise='스쿼트'
                              onClick={() => handleExerciseSelection('squat')}
                              selected={selectedExercises.squat}/>
                <ExerciseItem exercise="런지"
                              onClick={() => handleExerciseSelection('lunge')}
                              selected={selectedExercises.lunge}/>
                <ExerciseItem exercise='데드리프트'
                              onClick={() => handleExerciseSelection('deadLift')}
                              selected={selectedExercises.deadLift}/>

            </Box>
            <Box>
                <H4>하체 운동</H4>
                <ExerciseItem
                    exercise='플랭크'
                    onClick={() => handleExerciseSelection('plank')}
                    selected={selectedExercises.plank}/>
                <ExerciseItem
                    exercise='크런치'
                    onClick={() => handleExerciseSelection('crunch')}
                    selected={selectedExercises.crunch}/>
                <ExerciseItem
                    exercise='레그 레이즈'
                    onClick={() => handleExerciseSelection('legRaise')}
                    selected={selectedExercises.legRaise}/>
            </Box>
            <Box>
                <H4>팔 운동</H4>
                <ExerciseItem
                    exercise='푸쉬업'
                    onClick={() => handleExerciseSelection('pushUp')}
                    selected={selectedExercises.pushUp}/>
                <ExerciseItem
                    exercise='숄더 프레스'
                    onClick={() => handleExerciseSelection('shoulderPress')}
                    selected={selectedExercises.shoulderPress}/>
                <ExerciseItem
                    exercise='덤벨 로우'
                    onClick={() => handleExerciseSelection('dumbbellRow')}
                    selected={selectedExercises.dumbbellRow}/>
                <ExerciseItem
                    exercise='해머 컬'
                    onClick={() => handleExerciseSelection('hammerCurl')}
                    selected={selectedExercises.hammerCurl}/>

            </Box>
            <Button style={{width: '100px'}} onClick={handleButtonClick}>다음</Button>

            <NavigationBar/>

        </Container>
    );
}

export default WishExercise;