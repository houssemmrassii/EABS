import classes from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div id={classes.main}>
      <div className={classes.fof}>
        <h1>Error 404</h1>
      </div>
    </div>
  );
};

export default NotFound;
