import { useEffect, useState, useRef } from "react";
import BarCoin from "./BarCoin/BarCoin";
import classes from "./Bar.module.css";
import { motion } from "framer-motion";

function Bar(props) {
  const barRef = useRef(false);
  const animationRef = useRef(false);

  const [randomCoins, setRandomCoins] = useState(false);
  const [width, setWidth] = useState(0);
  const [resetAnimation, setResetAnimation] = useState(false);
  let isSet = false;
  let startingPosition = 0;

  const getRandomCoin = (list) => {
    const filteredList = props.allCoins.filter((item) => !list.includes(item));

    const randomItem =
      filteredList[Math.floor(Math.random() * filteredList.length)];

    return randomItem;
  };

  const addCoin = () => {
    const list = randomCoins.splice(0, randomCoins.length - 1);
    list.unshift(getRandomCoin(list));
    setRandomCoins(list);
  };

  useEffect(() => {
    const shuffled = props.allCoins.sort(() => 0.5 - Math.random());
    setRandomCoins(shuffled.slice(0, 20));
    setWidth(barRef.current.clientWidth);
  }, [width]);

  const handleResetAnimation = () => {
    setResetAnimation(!resetAnimation);
  };

  const check = () => {
    if (!isSet) {
      startingPosition = animationRef.current.getBoundingClientRect().right;
      isSet = true;
    }

    let boxPosition =
      animationRef.current.getBoundingClientRect().right - startingPosition;

    if (boxPosition > 110) {
      addCoin();
      handleResetAnimation();
    }
  };

  if (!randomCoins) {
    return <div>Loading...</div>;
  } else {
    return (
      <div ref={barRef} className={classes.tube}>
        <motion.div
          onUpdate={check}
          ref={animationRef}
          className={classes["coin-list"]}
          key={resetAnimation}
          initial={{ x: -110 * 10 }}
          animate={{ x: width }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
          {randomCoins.map((coin) => {
            return <BarCoin coin={coin} />;
          })}
        </motion.div>
      </div>
    );
  }
}

export default Bar;
