import React from 'react';
import {Container, NavigationBar} from "../UI/UIPackage";
import {useSelector} from "react-redux";
import RecommendUser from "./RecommendUser";
import MateDashboard from "./MateDashboard";

function Community(props) {

    const following = useSelector((state) => state.following)

    return (
        <Container>
            <h1>메이트</h1>
            {
                following?

                    (
                        <>
                            <h5>추천 메이트 보기</h5>

                        <MateDashboard/>
                        </>
                    )
                    :
                    (
                        <RecommendUser/>
                    )

            }
            <NavigationBar/>

        </Container>
    );
}

export default Community;
