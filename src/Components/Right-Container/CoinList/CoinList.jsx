import Coin from "../Coin/Coin";
import classes from "./CoinList.module.css";

function CoinList(props) {
  return (
    <ul>
      {props.showedCoins.map((coin) => {
        return (
          <li>
            <Coin coin={coin} chooseCoin={props.chooseCoin} />
          </li>
        );
      })}
    </ul>
  );
}

export default CoinList;
