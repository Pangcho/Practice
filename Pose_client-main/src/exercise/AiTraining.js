import React, { useState } from 'react';
import { Button, Container, ThemeColor } from '../UI/UIPackage';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import confetti from 'canvas-confetti';


const MeterBar = styled.div`
  width: 300px;
  height: 20px;
  background-color: ${ThemeColor.importantColor};
  margin: 10px auto;
  position: relative;
  border-radius: 10px;
`
const Progressbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 20px;
  border-radius: 10px;

  background-color: blue;`
const ProgressBar = ({goal, onComplete}) => {
    const [progress, setProgress] = useState(0);


    const handleButtonClick = () => {
        console.log(progress)
        if (progress < goal) {
            setProgress(progress + 1);
        }
        if (progress + 1 === parseInt(goal)) {
            // setComplete(true);
            onComplete(true)
            console.log('success')
            particle();
        }
    };

    function particle() {   //폭죽
        confetti({
            particleCount: 50,
            spread: 50
        });
    }


    const percent = ((progress / goal) * 100).toFixed(2);

    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '-20px'
            }}>
                <p>{progress}</p>
                <p>{goal}</p>
            </div>
            <MeterBar>
                <Progressbar style={{width: `${percent}%`}}>
                    <p></p>
                    <p style={{marginRight: '5px'}}>
                        {Math.round(percent)}%
                    </p>
                </Progressbar>
            </MeterBar>
            <button onClick={handleButtonClick}>+</button>
        </div>
    );
}

function AiTraining({text}) {
    const [isComplete, setIsComplete] = useState(false);


    const handleProgressBarComplete = (isComplete) => {
        setIsComplete(isComplete);
    };
    const location = useLocation()
    const label = location.state?.label || ''
    const goals = useSelector((state) => state.goals)
    const goal = goals.find(goal => goal.label === label)?.number


    return (
        <Container>
            <h1>{text}</h1>
            <img src="http://localhost:5000/video_feed" alt="Video feed" />
            {/*<PoseNetprtc/>*/}
            <br/>
            {goal ? (
                    <>
                        <ProgressBar goal={goal} onComplete={handleProgressBarComplete}/>
                        <Button style={{
                            backgroundColor: isComplete ? ThemeColor.buttonColor : ThemeColor.disabledButtonColor,
                            width: '110px', height: '35px',

                        }}>기록 저장</Button>
                    </>
                )
                :
                (
                    <>
                        <h1>{text}</h1>
                        <br/>
                        {/*<Button>기록 저장</Button>*/}
                        <h5>안녕?</h5>
                    </>

                )}
        </Container>
    );
}

export default AiTraining;
