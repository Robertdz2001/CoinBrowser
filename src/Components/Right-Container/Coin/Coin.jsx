import { useState } from "react";

import classes from "./Coin.module.css";

function Coin(props) {
  const [infoDisplay, setInfoDisplay] = useState("");
  const [coinSize, setCoinSize] = useState("");
  const [coinRotate, setcoinRotate] = useState("");

  const getSpanColor = (priceChange) => (priceChange < 0 ? "red" : "#94d82d");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getInfo() {
    if (coinSize === "") {
      let i,
        r = 0;
      for (i = 30; i <= 80; i += 10) {
        r -= 60;
        setcoinRotate(r);
        setCoinSize(i);
        await sleep(30);
      }

      const newInfo = (
        <div className={classes["coin-info"]}>
          <p className={classes.row}>
            {props.coin.rank}. {props.coin.name}
          </p>
          <p className={classes.row}>{props.coin.price.toFixed(2)} $;</p>
          <p style={{ color: getSpanColor(props.coin.priceChange1w) }}>
            {props.coin.priceChange1w.toFixed(2)}%
          </p>
        </div>
      );
      setInfoDisplay(newInfo);
    }
  }

  async function deleteInfo() {
    await sleep(500);
    if (coinSize !== "") {
      setInfoDisplay("");
      let i;
      for (i = 80; i >= 30; i -= 10) {
        setCoinSize(i);
        await sleep(10);
      }

      setCoinSize("");
    }
  }

  const giveCoin = () => {
    props.chooseCoin(props.coin);
  };

  return (
    <article
      className={classes.coin}
      style={{ width: coinSize + "%" }}
      onMouseOver={getInfo}
      onMouseLeave={deleteInfo}
      onClick={giveCoin}>
      <img
        src={props.coin.icon}
        className={classes.icons}
        style={{ transform: `rotate(${coinRotate}deg)` }}
      />
      {infoDisplay}
    </article>
  );
}

export default Coin;
