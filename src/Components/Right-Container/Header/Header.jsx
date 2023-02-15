import classes from "./Header.module.css";

function Header() {
  return (
    <header>
      <div className={classes["header-content"]}>
        <img src="src/coin-logo.jpg" className={classes["header-logo"]} />
        <span className={classes["logo-name"]}>CoinBrowser</span>
      </div>
      <svg viewBox="0 0 50 50" preserveAspectRatio="xMinYMin meet">
        <path
          d="M 0,4
              C 20,0 35,8 50,4 
              L 50,0 0,0  
              Z"></path>
      </svg>
      <span className={classes.search}> &darr; Search For Coin &darr;</span>
    </header>
  );
}

export default Header;
