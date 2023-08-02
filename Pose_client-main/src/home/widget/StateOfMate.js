import React from 'react';
import {ThemeColor, Scroll} from "../../UI/UIPackage";
import {Doughnut} from "react-chartjs-2";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";


const SquareBox = ({componentToRender, data}) => {
    const squatPercent = data.squat / 100
    const pullUpPercent = data.pullUp / 100
    const pushUpPercent = data.pushUp / 100
    const chartData = {
        labels: ['턱걸이', '스쿼트', '푸쉬업'],
        datasets: [
            {
                data: [pullUpPercent, 1 - pullUpPercent],
                backgroundColor: ['hotpink', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [squatPercent, 1 - squatPercent],
                backgroundColor: ['blue', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [pushUpPercent, 1 - pushUpPercent],
                backgroundColor: ['green', 'rgba(0, 0, 0, 0)'],
            },

        ],
    };
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
                borderWidth: 190,
                borderColor: 'transparent',
                borderRadius: 50,
            },
        },
    };
    const backgroundData = {
        labels: [1, 2, 3],
        datasets: [
            {
                data: [100, 0],
                backgroundColor: ['rgba(204, 51, 128, 0.2)', 'rgba(0, 0, 0, 0)']
            },
            {
                data: [100, 0],
                backgroundColor: ['rgba(0, 0, 153, 0.2)', 'rgba(0, 0, 0, 0)']
            },
            {
                data: [100, 0],
                backgroundColor: ['rgba(0, 64, 0, 0.2)', 'rgba(0, 0, 0, 0)']
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
                borderWidth: 190,
                borderColor: 'transparent',
            },
        },
    };
    return (
        <div style={{
            width: "123px",
            height: "123px",
            backgroundColor: `${ThemeColor.importantColor}`,
            margin: "15px",
            marginLeft: '10px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            borderRadius: '16px',
        }}>
            <span style={{position: 'relative', zIndex: '1', left: '150px'}}>
                {<Doughnut data={backgroundData} options={backgroundOptions}/>}
            </span>
            <span style={{position: 'relative', zIndex: '2', left: '-150px'}}>
                {<Doughnut data={chartData} options={options}/>}
            </span>
        </div>
    );
};

const Carousel = ({componentToRender, data}) => {
    return (
        <Scroll>
            {Object.values(data).map((data, index) => (
                <div key={index}>
                        <span style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '-15px',
                            fontWeight: 'bold',
                            fontSize: '13px',

                        }}
                        >{data.name}
                        </span>
                    {React.cloneElement(componentToRender, {data: data})}
                </div>
            ))}
        </Scroll>
    )
}
const NoMate = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '16px',
                padding: '20px',
                backgroundColor: ThemeColor.divColor
            }}>
            <h3 style={{marginTop: '0px'}}>메이트가 없습니다!</h3>
            <Link to={'/mate'} style={{
                textDecoration: 'none',
                color: 'black',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '160px'
            }}>
                <div>메이트 찾으러 가기</div>
                <FontAwesomeIcon icon={faArrowRight}/>
            </Link>

        </div>
    )
}
const UserMate = () => {
    const usersData = {
        john: {
            name: 'john',
            squat: 30,
            pushUp: 50,
            pullUp: 70,
        },
        park: {
            name: 'park',
            squat: 70,
            pushUp: 50,
            pullUp: 50,
        },
        kim: {
            name: 'kim',
            squat: 50,
            pushUp: 80,
            pullUp: 20,
        },
        hong: {
            name: 'hong',
            squat: 100,
            pushUp: 120,
            pullUp: 10,
        },
        lee: {
            name: 'lee',
            squat: 50,
            pushUp: 40,
            pullUp: 15,
        },
        choi: {
            name: 'choi',
            squat: 30,
            pushUp: 50,
            pullUp: 70,
        },
        jang: {
            name: 'jang',
            squat: 70,
            pushUp: 90,
            pullUp: 40,
        },
        yoon: {
            name: 'yoon',
            squat: 50,
            pushUp: 80,
            pullUp: 20,
        }
    }
    return (
        <div style={{width: '390px'}}>

            <div style={{marginLeft: '30px', display: 'flex', justifyContent: 'space-between'}}>
                <p>
                    메이트들의 운동 현황
                </p>
                <Link to={'/mate'} style={{textDecoration: 'none', color: 'black'}}>
                    <FontAwesomeIcon icon={faArrowRight} style={{marginRight: '20px', marginTop: '15px'}}/>
                </Link>
            </div>
            <Carousel data={usersData} componentToRender={<SquareBox/>}/>
        </div>
    )
}

function StateOfMate(props) {
    const following = useSelector((state) => state.following)

    return (
        <div style={{maxWidth: '390px'}}>
            {following ?
                (<UserMate/>)
                :
                (<NoMate/>)
            }

        </div>
    );
}

export default StateOfMate;