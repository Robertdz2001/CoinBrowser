import classes from "./SearchBar.module.css";

function SearchBar(props) {
  const filterShowedCoins = (event) => {
    if (event.target.value === "") {
      const newShowedCoins = props.allCoins.sort((coin1, coin2) => {
        return coin1.rank - coin2.rank;
      });
      props.onShowedChange(newShowedCoins);
    } else {
      const newShowedCoins = props.allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      props.onShowedChange(newShowedCoins);
    }
  };

  return (
    <div className={classes.searchbar}>
      <input
        type="text"
        onChange={filterShowedCoins}
        placeholder="Enter Coin Name"
      />
    </div>
  );
}

export default SearchBar;
