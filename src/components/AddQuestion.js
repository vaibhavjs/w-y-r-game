import classes from "./AddQuestion.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

function AddQuestion() {
  const dispatch = useDispatch();
  const { authedUser } = useSelector((state) => ({ ...state }));
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(authedUser, optionOne, optionTwo));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  const handleOptionOneChange = (e) => {
    setOptionOne(e.target.value);
  };

  const handleOptionTwoChange = (e) => {
    setOptionTwo(e.target.value);
  };

  return (
    <div className={classes.wyrContainer}>
      <div className={classes.addQuestion}>
        <h2>Create a new question: </h2>
        <br />
        <h3>
          <i>Would you rather ........</i>
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleOptionOneChange}
            value={optionOne}
          />
          <div className={classes.addQuestionFormOr}>Or</div>
          <input
            type="text"
            onChange={handleOptionTwoChange}
            value={optionTwo}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;
