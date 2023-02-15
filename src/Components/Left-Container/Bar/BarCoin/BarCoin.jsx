import classes from "./BarCoin.module.css";

function BarCoin(props) {
  const getSpanColor = (priceChange) => (priceChange < 0 ? "red" : "#94d82d");

  return (
    <div className={classes["random-coin"]}>
      <img className={classes.icon} src={props.coin.icon} />
      <span
        className={classes["price-change"]}
        style={{ color: getSpanColor(props.coin.priceChange1w) }}>
        {props.coin.priceChange1w.toFixed(2)}%
      </span>
    </div>
  );
}

export default BarCoin;
