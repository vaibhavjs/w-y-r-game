import classes from "./Leaderboard.module.css";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";

function Leaderboard() {
  const { users } = useSelector((state) => ({ ...state }));

  const formatUsers = (usersObj) => {
    let returnArr = [];
    Object.entries(usersObj).map(([key, value]) => {
      const answerCount = Object.keys(value.answers).length;
      const questionCount = value.questions.length;
      returnArr.push({
        id: value.id,
        name: value.name,
        avatarURL: value.avatarURL,
        answerCount: answerCount,
        questionCount: questionCount,
        score: answerCount + questionCount,
      });
    });
    return returnArr;
  };

  const formattedUsers = formatUsers(users).sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <div className={classes.wyrContainer}>
      <div className={classes.leaderboard}>
        <h3>Leaderboard :</h3>
        {Object.entries(formattedUsers).map(([key, user]) => (
          <div className={classes.leaderboardItem} key={key}>
            <div className={classes.leaderboardAvatar}>
              <Image
                width="60"
                height="60"
                src={user.avatarURL}
                roundedCircle
              />
            </div>
            <div className={classes.leaderboardInfo}>
              <div className={classes.leaderboardName}>{user.name}</div>
              <div>Answered Questions: {user.answerCount}</div>
              <div>Created Questions: {user.questionCount}</div>
            </div>
            <div>
              <div>Score: {user.score}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
