import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./App.module.css";

import CoinList from "./Components/Right-Container/CoinList/CoinList";
import SearchBar from "./Components/Right-Container/SearchBar/SearchBar";
import Header from "./Components/Right-Container/Header/Header";
import Footer from "./Components/Right-Container/Footer/Footer";
import Bar from "./Components/Left-Container/Bar/Bar";
import Chart from "./Components/Left-Container/Chart/Chart";

function App() {
  const [allCoins, setAllCoins] = useState(false);

  const [showedCoins, setShowedCoins] = useState(false);

  const [choosenCoinForPlot, setChoosenCoinForPlot] = useState(false);

  const getAllCoins = async () => {
    let response;
    try {
      response = await axios.get(
        "https://api.coinstats.app/public/v1/coins/?currency=USD"
      );
    } catch (err) {
      console.error(err);
    }

    return response.data.coins;
  };

  useEffect(() => {
    async function getData() {
      const response = await getAllCoins();
      setAllCoins(response);
      setShowedCoins(response);
    }
    getData();
  }, []);

  const changeShowedCoins = (newShowedCoins) => {
    setShowedCoins(newShowedCoins);
  };

  const changeChosenCoin = (newChosenCoin) => {
    setChoosenCoinForPlot(newChosenCoin);

    if (showedCoins.length == allCoins.length) {
      const temp = showedCoins.sort((coin1, coin2) => {
        return coin1.rank - coin2.rank;
      });
      setShowedCoins(temp);
    }
  };

  if (!showedCoins) {
    return <h3>Loading...</h3>;
  }

  return (
    <main>
      <div className={classes.bg} />
      <div className={`${classes.bg} ${classes.bg2}`} />
      <div className={`${classes.bg} ${classes.bg3}`} />

      <Header />
      <section className={classes.container}>
        <section className={classes["left-container"]}>
          <Bar allCoins={allCoins} />
          <div className={classes["chart"]}>
            {choosenCoinForPlot && (
              <Chart key={choosenCoinForPlot.id} coin={choosenCoinForPlot} />
            )}
          </div>
        </section>

        <section className={classes["right-container"]}>
          <SearchBar onShowedChange={changeShowedCoins} allCoins={allCoins} />
          <CoinList showedCoins={showedCoins} chooseCoin={changeChosenCoin} />
        </section>
        <section className={classes.glass} />
      </section>
      <Footer />
    </main>
  );
}

export default App;
