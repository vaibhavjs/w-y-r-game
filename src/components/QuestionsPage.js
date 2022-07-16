import classes from "./QuestionsPage.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Question from "./Question";

function QuestionsPage() {
  const { authedUser } = useSelector((state) => ({ ...state }));
  const { users } = useSelector((state) => ({ ...state }));
  const { questions } = useSelector((state) => ({ ...state }));

  const sortQuestionArr = (arr) => {
    arr.sort((a, b) => {
      return questions[b].timestamp - questions[a].timestamp;
    });
  };

  const answeredKeys = Object.keys(users[authedUser].answers);
  const questionKeys = Object.keys(questions);
  sortQuestionArr(answeredKeys);
  const unansweredKeys = questionKeys.filter(
    (id) => !answeredKeys.includes(id)
  );
  sortQuestionArr(unansweredKeys);
  const [selectedQuestions, setSelectedQuestions] = useState(unansweredKeys);
  const [menuItemAnsweredActive, setMenuItemAnsweredActive] = useState("");
  const [menuItemUnansweredActive, setMenuItemUnansweredActive] =
    useState("active");

  useEffect(() => {
    setMenuItemAnsweredActive("");
    setMenuItemUnansweredActive("active");
  }, []);

  const handleClick = (e) => {
    if (e.target.id === "unanswered-questions") {
      setSelectedQuestions(unansweredKeys);
      setMenuItemAnsweredActive("");
      setMenuItemUnansweredActive("active");
    } else {
      setSelectedQuestions(answeredKeys);
      setMenuItemAnsweredActive("active");
      setMenuItemUnansweredActive("");
    }
  };

  return (
    <div className={classes.wyrContainer}>
      <div className={classes.questionsPage}>
        <div className={classes.menuBar} onClick={handleClick}>
          <div
            id="unanswered-questions"
            className={classes.menuItem + " " + menuItemUnansweredActive}
          >
            Unanswered Questions
          </div>
          <div
            id="answered-questions"
            className={classes.menuItem + " " + menuItemAnsweredActive}
          >
            Answered Questions
          </div>
        </div>
        <div className={classes.questions}>
          {selectedQuestions.map((id) => {
            return (
              <div className={classes.questionItem} key={id}>
                <Question id={id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;
