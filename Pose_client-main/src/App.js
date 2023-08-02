import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./auth/Register";
import UserDetail from "./auth/UserDetail";
import UserDetail2 from "./auth/UserDetail2";
import UserDetail3 from "./auth/UserDetail3";
import AuthHome from "./auth/AuthHome";
import Account from "./account/Account";
import InputToss from "./prtc/InputToss";
import InputToss2 from "./prtc/InputToss2";
import Exercise from "./exercise/Exercise";
import Ranking from "./ranking/Ranking";
import Training from "./exercise/Training";
import UserSetting from "./account/UserSetting";
import Mate from "./mate/Mate";
import WishExercise from "./home/widget/currentExercise/WishExercise";
import GoalSetting from "./home/widget/currentExercise/GoalSetting";
import Current from "./home/widget/currentExercise/Current";
import SelectedExercise from "./exercise/SelectedExercise";
import {
  ACCOUNT,
  SELECTED_EXERCISE,
  RANKING,
  MATE,
  USER_SETTING,
  EXERCISE,
  TRAINING,
  WISH_EXERCISE,
  GOAL,
  CURRENT,
  NEW_USER,
  USER_DETAIL,
  USER_DETAIL_2,
  USER_DETAIL_3,
} from "./api";

const App = () => {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthHome />} />
          <Route path={ACCOUNT} element={<Account />} />
          <Route path={SELECTED_EXERCISE} element={<SelectedExercise />} />
          <Route path={RANKING} element={<Ranking />} />
          <Route path={MATE} element={<Mate />} />
          <Route path={USER_SETTING} element={<UserSetting />} />
          <Route path={EXERCISE} element={<Exercise />} />
          <Route path={TRAINING} element={<Training />} />
          <Route path={WISH_EXERCISE} element={<WishExercise />} />
          <Route path={GOAL} element={<GoalSetting />} />
          <Route path={CURRENT} element={<Current />} />
          <Route path={NEW_USER} element={<Register />} />
          <Route path={USER_DETAIL} element={<UserDetail />} />
          <Route path={USER_DETAIL_2} element={<UserDetail2 />} />
          <Route path={USER_DETAIL_3} element={<UserDetail3 />} />
          <Route path="/input" element={<InputToss />} />
          <Route path="/input2" element={<InputToss2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
