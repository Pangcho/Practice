import React, {useState} from 'react';
import {Container, CustomSelect, Input, Box, Button, exerciseName} from "../../../UI/UIPackage";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {GOAL_SETTING} from "../../../api";
import {useDispatch} from "react-redux";
import {putGoals} from "../../../state/userState";


function GoalInput({label, onChange}) {
    const amount = ['매일', '주 5회', '주 3회', '주 2회', '주 1회']
    const [cycle, setCycle] = useState()
    const [number, setNumber] = useState(0)

    const handleCycleChange = (selectedCycle) => {
        setCycle(selectedCycle)
        onChange(selectedCycle, number)
    }

    const handleAmountChange = (e) => {
        setNumber(e.target.value)
        onChange(cycle, e.target.value)
    }

    return (
        <Box>
            <h4 style={{marginLeft: "20px"}}>{exerciseName[label]} 목표 설정</h4>
            <div style={{width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{marginLeft: '20px'}}>
                    <CustomSelect options={amount} item={'운동 주기'} onChange={handleCycleChange}/>
                </div>
                <div>
                    <Input type="text" placeholder='횟수' onChange={handleAmountChange}
                           style={{width: "100px", height: "50px", margin: "0 20px 20px 20px"}}/>
                    <span>회</span>
                </div>
            </div>
        </Box>
    );
}

function GoalSetting(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate();
    const selectedExercise = location.state?.selected || ''

    const [isLoading, setIsLoading] = useState(false)
    const [dDay, setDDay] = useState(null)
    const [goals, setGoals] = useState([])

    const handleDDayChange = (e) => {
        setDDay(e.target.value)
    }

    const handleGoalInputChange = (selectedCycle, amount, label) => {
        const index = goals.findIndex((goal) => goal.label === label);

        if (index !== -1) {
            const updatedGoal = {...goals[index], cycle: selectedCycle, number: amount};
            const updatedGoals = [...goals];
            updatedGoals[index] = updatedGoal;
            setGoals(updatedGoals);
        } else {
            setGoals([...goals, {label, cycle: selectedCycle, number: amount}]);
        }
    };
    const handleSubmit = async () => {
        const token = sessionStorage.getItem('jwt');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        const userGoal = {
            dDay: dDay,
            goals: goals
        }
        setIsLoading(true)

        try {
            const response = await axios.post(GOAL_SETTING,
                {userGoal},
                {headers: headers});

            dispatch(
                putGoals({
                    dDay: dDay,
                    goals: goals
                }),
            )

            setIsLoading(false)
            alert('목표 설정이 완료되었습니다!');
            navigate('/exercise/current', {
                state: {
                    dDay: dDay,
                    goals: goals
                }
            })

        } catch (error) {
            console.error('Error while submitting userGoal:', error);
            alert('목표 설정에 실패했습니다. 다시 시도해주세요.');
            setIsLoading(false)

        }
    }
    return (
        <Container>
            <h1>목표 설정</h1>
            <Box>
                <h4 style={{marginLeft: "20px"}}>기한 설정</h4>
                <Input type="date" style={{width: "330px", height: "41px", margin: "0 20px 20px 20px"}}
                       onChange={handleDDayChange}/>
            </Box>
            {selectedExercise.map((exercise) => (
                <GoalInput key={exercise} label={exercise}
                           onChange={(cycle, number) => handleGoalInputChange(cycle, number, exercise)}/>
            ))}

            <Button style={{width: '100px'}} onClick={handleSubmit}>완료</Button>
        </Container>
    );
}

export default GoalSetting;
