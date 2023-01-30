import { useEffect, useState } from "react";
import solve from "../services/solver";
import Tower from "./Tower";

export default function Game() {
  const [initialized, setInitialized] = useState(false);
  const [ringCount, setRingCount] = useState(4);
  const [moves, setMoves] = useState(0);
  const [towerOne, setTowerOne] = useState({
    rings: [],
    active: false,
  });
  const [towerTwo, setTowerTwo] = useState({
    rings: [],
    active: false,
  });
  const [towerThree, setTowerThree] = useState({
    rings: [],
    active: false,
  });
  towerOne.setTower = setTowerOne;
  towerTwo.setTower = setTowerTwo;
  towerThree.setTower = setTowerThree;

  const [selectedTowers, setSelectedTowers] = useState([]);

  function checkWin() {
    let towerTwoWin = true;
    let towerThreeWin = true;

    if (towerTwo.rings.length === ringCount) {
      for (let a = 0; a < towerTwo.rings.length; a++) {
        if (towerTwo.rings[a] !== a + 1) {
          towerTwoWin = false;
        }
        console.log(towerTwo.rings);
      }
    }
    if (towerOne.rings.length === ringCount) {
      for (let b = 0; b < towerThree.rings.length; b++) {
        if (towerThree.rings[b] !== b + 1) {
          towerThreeWin = false;
        }
        console.log(towerThree.rings);
      }
    }
    return towerTwoWin || towerThreeWin;
  }

  useEffect(() => {
    let nextTowerOne = towerOne;
    if (!initialized) {
      nextTowerOne = { ...towerOne };
      let rings = [];
      for (let i = 0; i < ringCount; i++) {
        rings.push(i + 1);
      }
      nextTowerOne.rings = rings;
    }
    setTowerOne(nextTowerOne);
    setTowerTwo({ rings: [], setTower: setTowerTwo });
    setTowerThree({ rings: [], setTower: setTowerThree });
    setInitialized(true);
    // setTimeout(() => {
    //   solve(towerOne, towerTwo, towerThree);
    // }, 1000);
  }, [ringCount, initialized]);

  useEffect(() => {
    let nextSelectedTowers = selectedTowers;
    let nextMoves = moves;
    if (selectedTowers.length === 2) {
      nextSelectedTowers = [...selectedTowers];
      let towerFrom = { ...selectedTowers[0] };
      let towerTo = { ...selectedTowers[1] };
      if (towerTo.rings.length === 0 || towerTo.rings[0] > towerFrom.rings[0]) {
        towerTo.rings.unshift(towerFrom.rings.shift());
        nextMoves += 1;
        towerFrom.setTower(towerFrom);
        towerTo.setTower(towerTo);
      }
      nextSelectedTowers = [];
    }
    setSelectedTowers(nextSelectedTowers);
    setMoves(nextMoves);
    console.log(`win: ${checkWin()}`);
    console.log(selectedTowers, moves);
  }, [selectedTowers]);

  return (
    <>
      <div className="display">
        <div className="high-contrast game">
          <Tower
            tower={towerOne}
            selectedTowers={selectedTowers}
            setSelectedTowers={setSelectedTowers}
          />
          <Tower
            tower={towerTwo}
            selectedTowers={selectedTowers}
            setSelectedTowers={setSelectedTowers}
          />
          <Tower
            tower={towerThree}
            selectedTowers={selectedTowers}
            setSelectedTowers={setSelectedTowers}
          />
        </div>
        <button onClick={setInitialized.bind(null, false)}>Reset</button>
      </div>
    </>
  );
}
