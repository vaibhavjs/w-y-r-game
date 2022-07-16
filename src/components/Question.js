import classes from "./Question.module.css";
import { useSelector, useDispatch } from "react-redux";
import { questionAnswer } from "../actions/shared";
import { Link } from "react-router-dom";

function Question(props) {
  const { users } = useSelector((state) => ({ ...state }));
  const { questions } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(questionAnswer(null));
  };

  const userLookup = (user_id) => {
    return users[user_id].name;
  };

  const formatQuestion = (questionStr) => {
    const returnStr =
      questionStr.charAt(0).toUpperCase() + questionStr.slice(1);
    return returnStr.substring(0, 20);
  };

  const authorName = userLookup(questions[props.id].author);
  const avatar = users[questions[props.id].author].avatarURL;

  return (
    <>
      <div className={classes.questionName}>Question by {authorName}</div>
      <div className={classes.question}>
        <div className={classes.questionAvatar}>
          <img className={classes.image} src={avatar} alt="alt" />
        </div>
        <div className={classes.questionContent}>
          <div className={classes.questionHeader}>Would you rather</div>
          <div className={classes.questionPreview}>
            {formatQuestion(questions[props.id].optionOne.text)}...
          </div>
          <div className={classes.questionBtn}>
            <Link onClick={handleClick} to={`/questions/${props.id}`}>
              Answer Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
