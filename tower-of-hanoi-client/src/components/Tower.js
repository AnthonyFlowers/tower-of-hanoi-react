import { useState } from "react";
import Ring from "./Ring";

export default function Tower({
  tower,
  selectedTowers,
  setSelectedTowers,
  ringCount,
}) {
  const [invalid, setInvalid] = useState(false);

  function setActive() {
    let nextTowers = selectedTowers;
    let nextInvalid = nextTowers.length === 0 && tower.rings.length === 0;
    if (nextTowers.indexOf(tower) === 0 && nextTowers.length === 1) {
      nextTowers = [];
    }
    if (
      !nextInvalid &&
      nextTowers.length <= 1 &&
      nextTowers.indexOf(tower) < 0
    ) {
      nextTowers = [...selectedTowers];
      nextTowers.push(tower);
    }
    setInvalid(nextInvalid);
    setSelectedTowers(nextTowers);
    setTimeout(() => {
      setInvalid(false);
    }, 500);
  }

  return (
    <div
      className={`tower${invalid ? " invalid" : ""}${
        tower.rings.length === ringCount && tower.id !== 1 ? " tower-win" : ""
      }`}
      onClick={setActive}
    >
      {tower.rings.length === ringCount && tower.id !== 1 ? (
        <span className="text">Nice Job!</span>
      ) : (
        ""
      )}
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
