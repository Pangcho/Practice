import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Button, CustomSelect, InfoBox, Input, Loading, ThemeColor, UserBox, UserBoxSize,} from "../UI/UIPackage";
import {
    GET_FOLLOWERS,
    GET_FOLLOWING,
    IS_PASSWORD_CORRECT,
    UPDATE_AGE,
    UPDATE_AREA,
    UPDATE_EXERCISE,
    UPDATE_HEIGHT,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
    UPDATE_WEIGHT,
    UPDATE_WISHLIST
} from "../api";
import {
    putFollowerNames,
    putFollowingNames,
    updateAge,
    updateArea,
    updateExercise,
    updateHeight,
    updateProfile,
    updateWeight,
    updateWishList
} from "../state/userState";
import {ButtonGroup} from "../auth/UserDetail3";

const getJWT = () => {
    const jwt = sessionStorage.getItem('jwt');
    return {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    };
}
const updateData = async (url, dataToUpdate, dispatchUpdateAction, setIsLoading, setIsSuccessMessage, dispatch) => {
    const headers = getJWT()
    setIsLoading(true);
    try {
        const response = await axios.put(url, dataToUpdate, {headers});
        dispatch(dispatchUpdateAction(dataToUpdate));
        if (response.data.state) {
            setIsLoading(false);
            setIsSuccessMessage(true);
            setTimeout(() => {
                setIsSuccessMessage(false);
            }, 2000);
        }
    } catch (error) {
        console.error('API 요청 에러:', error);
    }
};
export const UserProfileSetting = ({name, email}) => {
    return (
        <>
            {name && <UserBox name={name} email={email} size={UserBoxSize.large}/>}
        </>
    )
}
const StyledSpan = styled.span`margin: 5px 180px 5px 2px;`;
const OldPassword = ({setIsPasswordCorrect}) => {
    //새 비밀번호
    const [oldPassword, setOldPassword] = useState("");
    //api 통신 로딩
    const [isLoading, setIsLoading] = useState(false);
    //비밀번호 일치 여부
    const [isFailed, setIsFailed] = useState(false);

    const handlePasswordChange = (e) => {
        setOldPassword(e.target.value);
    }
    const handleOldPassword = async () => {
        const headers = getJWT()
        setIsLoading(true);
        try {
            const response = await axios.post(IS_PASSWORD_CORRECT,
                {password: oldPassword},
                {headers: headers});
            if (response.data.state) {
                setIsLoading(false);
                setIsPasswordCorrect(false)
                setIsFailed(false)
            } else {
                setIsLoading(false);
                setIsPasswordCorrect(true)
                setIsFailed(true)
                setTimeout(() => {
                    setIsFailed(false)
                }, 2000);
            }
            setIsPasswordCorrect(response.data.state);
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    }

    return (
        <>
            <StyledSpan>기존 비밀번호</StyledSpan>
            <Input type="password" placeholder="기존 비밀번호를 입력하세요" onChange={handlePasswordChange}/>
            {isFailed && <span>비밀번호가 틀렸습니다</span>}
            <Button onClick={handleOldPassword}>{isLoading ? (<Loading/>) : ("확인")}</Button>

        </>
    )
}
const NewPassword = () => {
    //새 비밀번호
    const [newPassword, setNewPassword] = useState("");
    //api 통신 로딩
    const [isLoading, setIsLoading] = useState(false);
    //비밀번호 수정 성공 메시지
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    //수정 버튼 잠금
    const [isNoChange, setIsNoChange] = useState(false)
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    }
    const handleUpdate = async () => {
        const headers = getJWT()
        setIsLoading(true);
        try {
            const response = await axios.put(UPDATE_PASSWORD,
                {newPassword: newPassword},
                {headers: headers});
            if (response.data.state) {
                setIsLoading(false);
                setIsSuccessMessage(true);
                setNewPassword("")
                setTimeout(() => {
                    setIsSuccessMessage(false);
                }, 2000);
            }
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    }
    useEffect(() => {
        setIsNoChange(newPassword === "");
    }, [newPassword]);
    return (
        <>
            <StyledSpan>새 비밀번호</StyledSpan>
            <Input type="password" placeholder="새 비밀번호를 입력하세요" defaultValue={newPassword}
                   onChange={handlePasswordChange}/>
            {isSuccessMessage && <span>수정 완료</span>}
            <Button onClick={handleUpdate} disabled={isNoChange}>{isLoading ? (<Loading/>) : ("수정")}</Button>

        </>
    )
}

export const ChangeUserProfile = ({name, email}) => {
    const [newName, setNewName] = useState(name)
    const [newEmail, setNewEmail] = useState(email);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isNoChange, setIsNoChange] = useState(false)
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)

    const dispatch = useDispatch();
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
    }

    useEffect(() => {
        setIsNoChange(newName === name && newEmail === email)
    }, [newName, newEmail])

    const handleUpdate = () => {
        updateData(
            UPDATE_PROFILE, {
                name: newName,
                email: newEmail
            },
            updateProfile, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {
            },
            (error) => {
                console.error(error);
            }
        );
    };


    return (
        <>
            <StyledSpan>이름</StyledSpan>
            <Input type="name" defaultValue={name} onChange={handleNameChange}/>
            <StyledSpan>이메일</StyledSpan>
            <Input type="email" defaultValue={email} onChange={handleEmailChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>{isLoading ? (<Loading/>) : ("수정")}</Button>
            <br/>
            {isPasswordCorrect ? (<NewPassword/>) : (<OldPassword setIsPasswordCorrect={setIsPasswordCorrect}/>)}
        </>
    )
}
export const FollowingSetting = ({following}) => {
    return (
        <>
            <p>팔로잉</p>
            <p>{following ? following && following.length : '0'}명</p>
        </>
    )
}
export const ShowFollowing = ({following}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    const fetchData = async () => {
        const headers = getJWT()
        setIsLoading(true)
        try {
            const response = await axios.post(GET_FOLLOWING, {following},
                {headers: headers});
            const data = response.data;
            dispatch(
                putFollowingNames({followingNames: data.following})
            )
            console.log('get data complete!')

            setIsLoading(false)
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [following])

    const {followingNames} = useSelector(state => state)
    if (isLoading) return (<Loading/>)
    if (followingNames?.length === 0) return (<span>팔로잉한 계정이 없습니다.</span>)
    return (
        <>
            <span>팔로잉</span>
            <span>
                    {followingNames?.map((user) => (
                        <InfoBox style={{width: '230px'}} key={user[1]}>
                            <UserBox
                                name={user[0]}
                                email={user[1]}
                                size={UserBoxSize.medium}
                                style={{padding: '5px 0px'}}
                            />
                        </InfoBox>
                    ))}
            </span>
        </>
    )
}
export const FollowersSetting = ({followers}) => {
    return (
        <>
            <p>팔로워</p>
            <p>{followers ? followers && followers.length : '0'}명</p>
        </>
    )
}
export const ShowFollowers = ({followers}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const fetchData = async () => {
        const headers = getJWT()
        setIsLoading(true)
        try {
            const response = await axios.post(GET_FOLLOWERS, {followers},
                {headers: headers});
            const data = response.data;
            dispatch(
                putFollowerNames({followerNames: data.followers})
            )
            console.log('get data complete!')

            setIsLoading(false)
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [followers])

    const {followerNames} = useSelector(state => state)
    if (isLoading) return (<Loading/>)
    if (followerNames?.length === 0) return (<span>팔로워가 없습니다.</span>)
    return (
        <>
            <span>팔로워</span>
            {followerNames?.map((user) => (
                <InfoBox style={{width: '230px'}} key={user[1]}>
                    <UserBox
                        name={user[0]}
                        email={user[1]}
                        size={UserBoxSize.medium}
                        style={{padding: '5px 0px'}}
                    />
                </InfoBox>
            ))}
        </>
    )
}

export const AreaSetting = ({area}) => {
    return (
        <>
            <p>지역</p>
            <p>{area}</p>
        </>
    )
}
export const ChangeArea = ({area}) => {
    const areaList = ['서울', '경기', '인천', '강원', '충북', '충남', '대전', '경북', '경남', '대구', '울산', '부산', '전북', '전남', '광주', '제주']
    const [newArea, setNewArea] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();

    const handleAreaChange = (selectedArea) => {
        setNewArea(selectedArea)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_AREA, {area: newArea},
            updateArea, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            (success) => {
            },
            (error) => {
                console.error(error);
            }
        );
    };

    useEffect(() => {
        setIsNoChange(!newArea)
    }, [newArea])
    return (
        <div style={{width: '300px'}}>
            <p>현재 지역 : {area}</p>
            <CustomSelect options={areaList} item='지역' onChange={handleAreaChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const AgeSetting = ({age}) => {
    return (
        <>
            <p>나이</p>
            <p>{age}</p>
        </>
    )
}
export const ChangeAge = ({age}) => {
    const [newAge, setNewAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const ageList = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();
    const handleAgeChange = (selectedAge) => {
        setNewAge(selectedAge)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_AGE, {age: newAge},
            updateAge, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {
            },
            (error) => {
                console.error(error);
            }
        );
    };
    useEffect(() => {
        setIsNoChange(!newAge)
    }, [newAge])
    return (
        <div style={{width: '300px'}}>
            <p>현재 나이 : {age}</p>
            <CustomSelect options={ageList} item='나이' onChange={handleAgeChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}

export const WeightSetting = ({weight}) => {
    const stringWeight = weight.toString()
    return (
        <>
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
        </>
    )
}

export const ChangeWeight = ({weight}) => {
    const [newWeight, setNewWeight] = useState(null);
    const weightList = ['50 이하', 50, 60, 70, 80, 90, '90 이상']
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)
    const stringWeight = weight.toString()

    const dispatch = useDispatch();

    const handleWeightChange = (selectedWeight) => {
        setNewWeight(selectedWeight)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_WEIGHT,
            {weight: newWeight},
            updateWeight, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {
            },
            (error) => {
                console.error(error);
            }
        );
    };

    useEffect(() => {
        setIsNoChange(!newWeight)
    }, [newWeight])
    return (
        <div style={{width: '300px'}}>
            <p>현재 몸무게 : {stringWeight.includes('이상') || stringWeight.includes('이하') ? (
                <>
                    {stringWeight.substring(0, 2)}
                    <span style={{fontSize: '15px'}}>
                    kg {stringWeight.includes('이상') ? '이상' : '이하'}
                </span>
                </>
            ) : (
                <>
                    {weight}kg
                </>
            )}</p>
            <CustomSelect options={weightList} item='몸무게' onChange={handleWeightChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const HeightSetting = ({height}) => {
    const stringHeight = height.toString()
    return (
        <>
            <p>키</p>
            {stringHeight.includes('이상') || stringHeight.includes('이하') ? (
                    <p>
                        {stringHeight.substring(0, 3)}
                        <span style={{fontSize: '15px'}}>
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
        </>
    )
}
export const ChangeHeight = ({height}) => {
    const [newHeight, setNewHeight] = useState(null);
    const heightList = ['150 이하', 150, 160, 170, 180, 190, '190 이상']
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)
    const stringHeight = height.toString()

    const dispatch = useDispatch();

    const handleHeightChange = (selectedHeight) => {
        setNewHeight(selectedHeight)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_HEIGHT,
            {height: newHeight},
            updateHeight, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {
            },
            (error) => {
                console.error(error);
            }
        );
    };

    useEffect(() => {
        setIsNoChange(!newHeight)
    }, [newHeight])
    return (
        <div style={{width: '300px'}}>
            <p>현재 키 : {stringHeight.includes('이상') || stringHeight.includes('이하') ? (
                    <>
                        {stringHeight.substring(0, 3)}
                        <span style={{fontSize: '15px'}}>
                            cm {stringHeight.includes('이상') ? '이상' : '이하'}
                        </span>
                    </>
                )
                :
                (
                    <>
                        {height}<span style={{fontSize: '15px'}}>cm</span>
                    </>
                )
            }</p>
            <CustomSelect options={heightList} item='키' onChange={handleHeightChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const ExerciseSetting = ({exercise}) => {
    return (
        <>
            <p>주로 하는 운동</p>
            <p>{exercise}</p>
        </>
    )
}
export const ChangeExercise = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const dispatch = useDispatch();

    const handleClickChange = (selectedExercise) => {
        updateData(
            UPDATE_EXERCISE,
            {exercise: selectedExercise},
            updateExercise, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {
            },
            (error) => {
                console.error(error);
            }
        );
    }
    return (
        <>
            <p>주로 하는 운동 재선택</p>
            {isLoading ? (<Loading/>) : (
                <>
                    <Button onClick={() => handleClickChange('홈 트레이닝')}>홈 트레이닝</Button>
                    <Button onClick={() => handleClickChange('헬스')}>헬스</Button>
                </>
            )}
            {isSuccessMessage && <p>수정 완료</p>}
        </>
    )
}

export const WishListSettingButton = () => {
    return (<span style={{fontWeight: 'bold'}}>고민 수정</span>)
}

export const ChangeWishList = ({wishList}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const newWishList = ['평생 숙제 다이어트', '뱃살, 옆구리살 빼기', '마른 몸 벗어나기', '탄탄한 몸 만들기', '넓은 어깨 갖기', '슬림한 하체 만들기', '벌크업 하기', '굵코 큰 팔 만들기', '힙업', '팔뚝 군살 제거', '전체적인 근육량 증가', '선명한 복근 만들기', '굵은 하체 만들기']
    const [isNoChange, setIsNoChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const dispatch = useDispatch();

    const handleOptionsChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    }

    useEffect(() => {
        setIsNoChange(selectedOptions.length === 0)
    }, [selectedOptions])
    const handleUpdate = () => {
        updateData(
            UPDATE_WISHLIST,
            {wishList: selectedOptions},
            updateWishList, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {
            },
            (error) => {
                console.error(error);
            }
        );
    };
    return (
        <div style={{width: '370px'}}>
            <h2>고민 재선택</h2>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ButtonGroup buttons={newWishList} selectedWishList={wishList} onChange={handleOptionsChange}/>
                <br/>
                <Button disabled={isNoChange} style={{
                    width: '150px',
                    backgroundColor: isNoChange ? ThemeColor.disabledButtonColor : ThemeColor.buttonColor
                }} onClick={handleUpdate}>
                    {isLoading ? (<Loading/>) : ("수정")}
                </Button>

                {isSuccessMessage && <p>수정 완료</p>}
            </div>
        </div>
    )
}
