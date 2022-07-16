import classes from "./AnswerQuestion.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.css";
import { handleAnswerQuestion } from "../actions/questions";

function AnswerQuestion() {
  const { users } = useSelector((state) => ({ ...state }));
  const { questions } = useSelector((state) => ({ ...state }));
  const { authedUser } = useSelector((state) => ({ ...state }));
  const { questionAnswer } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const dispatch = useDispatch();

  const paramIdExists = Object.keys(questions).includes(id);

  const userLookup = (user_id) => {
    return users[user_id].name;
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      handleAnswerQuestion({ qid: id, authedUser, answer: e.target.id })
    );
  };

  const totalVotes = () => {
    return (
      questions[id].optionOne.votes.length +
      questions[id].optionTwo.votes.length
    );
  };

  const votePercentage = (votes) => {
    return ((100 / totalVotes()) * votes).toFixed(0);
  };

  const formatQuestion = (questionStr) => {
    const returnStr =
      questionStr.charAt(0).toUpperCase() + questionStr.slice(1);
    return returnStr;
  };

  const questionAuthor = paramIdExists
    ? userLookup(questions[id].author)
    : "404";
  const optionOneVotes = paramIdExists
    ? questions[id].optionOne.votes.length
    : "0";
  const optionTwoVotes = paramIdExists
    ? questions[id].optionTwo.votes.length
    : "0";

  return (
    <div className={classes.wyrContainer}>
      {paramIdExists ? (
        <>
          {!questionAnswer ? (
            <div className={classes.answerQuestion}>
              <div className={classes.wouldYouRatherAuthor}>
                <div className={classes.wouldYouRatherAuthorAvatar}>
                  <Image
                    src={users[questions[id].author].avatarURL}
                    height="50"
                    width="50"
                    roundedCircle
                  />
                </div>
                <span>Question by {questionAuthor}</span>
              </div>
              <div className={classes.wouldYouRatherTitle}>
                Would you Rather...
              </div>
              <div>
                <form className={classes.formOptions}>
                  <div className={classes.formOption}>
                    <label htmlFor="optionOne">
                      {formatQuestion(questions[id].optionOne.text)}
                    </label>
                    <br />
                    <button id="optionOne" onClick={handleClick}>
                      Vote
                    </button>
                  </div>
                  <div className={classes.formOption}>
                    <label htmlFor="optionTwo">
                      {formatQuestion(questions[id].optionTwo.text)}
                    </label>
                    <br />
                    <button id="optionTwo" onClick={handleClick}>
                      Vote
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className={classes.questionResponse}>
              <div className={classes.author}>{questionAuthor} asked</div>
              <div className={classes.result}>Results</div>
              <div
                className={`${classes.optionBox} ${
                  questionAnswer === "optionOne" ? "selected" : ""
                }`}
              >
                <div className={classes.resultTitle}>
                  Would you rather {questions[id].optionOne.text}
                </div>
                <div>
                  <ProgressBar
                    variant="danger"
                    now={votePercentage(optionOneVotes)}
                    label={`${votePercentage(optionOneVotes)}%`}
                  />
                  <div>
                    {optionOneVotes} of {totalVotes()} votes.
                  </div>
                </div>
                {questionAnswer === "optionOne" && (
                  <div className={classes.resultYourvote}>YOUR VOTE</div>
                )}
              </div>

              <div
                className={`${classes.optionBox} ${
                  questionAnswer === "optionTwo" ? "selected" : ""
                }`}
              >
                <div className={classes.resultTitle}>
                  Would you rather {questions[id].optionTwo.text}
                </div>
                <div>
                  <ProgressBar
                    variant="danger"
                    now={votePercentage(optionTwoVotes)}
                    label={`${votePercentage(optionTwoVotes)}%`}
                  />
                  <div>
                    {optionTwoVotes} of {totalVotes()} votes.
                  </div>
                </div>
                {questionAnswer === "optionTwo" && (
                  <div className={classes.resultYourvote}>YOUR VOTE</div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div id="404">Oops, Page cannot be found.</div>
        </>
      )}
    </div>
  );
}

export default AnswerQuestion;
