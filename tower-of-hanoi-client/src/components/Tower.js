import { useEffect, useState } from "react";
import Ring from "./Ring";

export default function Tower({ tower, selectedTowers, setSelectedTowers }) {
  const [invalid, setInvalid] = useState(false);

  function flashTower() {
    setInvalid(true);
    console.log("tower flash");
    setTimeout(() => {
      setInvalid(false);
      console.log("no flash");
    }, 1000);
  }

  function setActive() {
    let nextTowers = selectedTowers;
    if (nextTowers.indexOf(tower) === 0 && nextTowers.length === 1) {
      nextTowers = [];
      console.log("de-selected");
    }
    if (nextTowers.length === 0 && tower.rings.length === 0) {
      console.log("empty tower not selecting");
      flashTower();
    } else if (nextTowers.length <= 1 && nextTowers.indexOf(tower) < 0) {
      nextTowers = [...selectedTowers];
      nextTowers.push(tower);
    } else {
      console.log("did not add tower to selected");
    }
    setSelectedTowers(nextTowers);
    console.log(nextTowers);
  }

  return (
    <div
      className={`tower${invalid ? " invalid flash" : ""}`}
      onClick={setActive}
    >
      {tower.rings.map((r, i) => {
        return (
          <Ring
            key={r}
            size={r}
            active={selectedTowers.indexOf(tower) >= 0 && i === 0}
          />
        );
      })}
    </div>
  );
}
