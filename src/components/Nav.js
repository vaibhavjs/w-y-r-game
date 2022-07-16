import classes from "./Nav.module.css";
import Image from "react-bootstrap/Image";
import { setAuthedUser } from "../actions/authedUser";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function SignIn(props) {
  const dispatch = useDispatch();
  const { authedUser } = useSelector((state) => ({ ...state }));
  const { users } = useSelector((state) => ({ ...state }));

  const location = useLocation();

  const handleSignOut = () => {
    dispatch(setAuthedUser(null));
  };

  return (
    <nav>
      {authedUser && (
        <>
          <div className={classes.navLinks}>
            <span className={location.pathname === "/" ? classes.active : ""}>
              <Link to="/">ANSWER QUESTION</Link>
            </span>
            &nbsp;
            <span
              className={location.pathname === "/add" ? classes.active : ""}
            >
              <Link to="/add">ADD QUESTION</Link>
            </span>
            <span
              className={
                location.pathname === "/leaderboard" ? classes.active : ""
              }
            >
              <Link to="/leaderboard">LEADERBOARD</Link>
            </span>
          </div>
          <div className={classes.navUser}>
            <Image
              src={users[authedUser].avatarURL}
              width="30"
              height="30"
              roundedCircle
            />
            <span className={classes.navUserName}>
              {users[authedUser].name.toUpperCase()}
            </span>
            <span className={classes.navSignOut} onClick={handleSignOut}>
              SIGN OUT
            </span>
          </div>
        </>
      )}
    </nav>
  );
}

export default SignIn;
