import classes from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={classes.spinner}>
      <div className={classes.loadingText}>Loading.....</div>
      <div className={classes["lds-hourglass"]}></div>
    </div>
  );
}

export default Spinner;
