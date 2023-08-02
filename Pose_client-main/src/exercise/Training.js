import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Container, NavigationBar, exerciseName} from "../UI/UIPackage";
import Examples from "./Examples";
import AiTraining from "./AiTraining";
import {useLocation} from "react-router-dom";

function Training(props) {
    const location = useLocation()
    const exercise = location.state?.exercise || ''
    const settings = {
        arrows: false,
        dots: true,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <>
            <Slider {...settings}>
                <Container>
                    <AiTraining text={exercise}/>
                </Container>
                <Container>
                    <Examples/>
                </Container>
            </Slider>
            <NavigationBar/>
        </>
    );
}

export default Training;
