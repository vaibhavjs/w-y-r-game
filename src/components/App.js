import classes from "./App.module.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import QuestionsPage from "./QuestionsPage";
import AddQuestion from "./AddQuestion";
import AnswerQuestion from "./AnswerQuestion";
import Leaderboard from "./Leaderboard";
import Spinner from "./Spinner";
import Nav from "./Nav";
import SignIn from "./SignIn";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const { authedUser } = useSelector((state) => ({ ...state }));
  const { spinner } = useSelector((state) => ({ ...state }));
  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Nav />
        <main>
          {spinner ? (
            <Spinner />
          ) : (
            <>
              {authedUser ? (
                <Routes>
                  <Route path="/" exact element={<QuestionsPage />} />
                  <Route path="/questions/:id" element={<AnswerQuestion />} />
                  <Route path="/add" element={<AddQuestion />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
              ) : (
                <SignIn />
              )}
            </>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default connect()(App);
