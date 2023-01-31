import { useEffect, useState } from "react";
import solve from "../services/solver";
import Tower from "./Tower";

export default function Game() {
  const [initialized, setInitialized] = useState(false);
  const [ringCount, setRingCount] = useState(4);
  const [pieceInput, setPieceInput] = useState(4);
  const [moves, setMoves] = useState(0);
  const [selectedTowers, setSelectedTowers] = useState([]);
  const [towerOne, setTowerOne] = useState({
    id: 1,
    rings: [],
    invalid: false,
  });
  const [towerTwo, setTowerTwo] = useState({
    id: 2,
    rings: [],
    invalid: false,
  });
  const [towerThree, setTowerThree] = useState({
    id: 3,
    rings: [],
    invalid: false,
  });
  towerOne.setTower = setTowerOne;
  towerTwo.setTower = setTowerTwo;
  towerThree.setTower = setTowerThree;

  function handleChange(evt) {
    let nextValue = Number(evt.target.value);

    if (nextValue < 1 || nextValue > 8) {
      nextValue = pieceInput;
    }
    setPieceInput(nextValue);
  }

  function changePieceCount() {
    setRingCount(pieceInput);
    setInitialized(false);
  }

  useEffect(() => {
    let nextTowerOne = towerOne;
    if (!initialized) {
      setMoves(0);
      nextTowerOne = { ...towerOne };
      let rings = [];
      for (let i = 0; i < ringCount; i++) {
        rings.push(i + 1);
      }
      nextTowerOne.rings = rings;
    }
    setTowerOne(nextTowerOne);
    setTowerTwo({ rings: [], setTower: setTowerTwo, invalid: false });
    setTowerThree({ rings: [], setTower: setTowerThree, invalid: false });
    setInitialized(true);
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
        selectedTowers[0].setTower(towerFrom);
        selectedTowers[1].setTower(towerTo);
      }
      nextSelectedTowers = [];
    }
    setSelectedTowers(nextSelectedTowers);
    setMoves(nextMoves);
  }, [selectedTowers]);

  return (
    <div className="display">
      <h2>Tower of Hanoi!</h2>
      <p>
        Move all the pieces from the left tower onto one of the other towers
      </p>
      <p className="text">
        Click to select a tower and click another tower to move a piece. You can
        only move a piece onto an empty tower or a tower with a larger piece on
        top.
      </p>
      <div className="game">
        <Tower
          tower={towerOne}
          selectedTowers={selectedTowers}
          setSelectedTowers={setSelectedTowers}
          ringCount={ringCount}
        />
        <Tower
          tower={towerTwo}
          selectedTowers={selectedTowers}
          setSelectedTowers={setSelectedTowers}
          ringCount={ringCount}
        />
        <Tower
          tower={towerThree}
          selectedTowers={selectedTowers}
          setSelectedTowers={setSelectedTowers}
          ringCount={ringCount}
        />
      </div>
      <p className="score">Move Count: {moves}</p>
      <p>Optimal Move Count: {Math.pow(2, ringCount) - 1}</p>
      <div className="controls">
        <button
          className="button red"
          onClick={setInitialized.bind(null, false)}
        >
          Reset
        </button>
        <button className="button btn-piece-count" onClick={changePieceCount}>
          Piece Count
        </button>
        <input
          className="input-piece-count"
          type="number"
          value={pieceInput}
          onChange={handleChange}
          max={8}
        ></input>
      </div>
    </div>
  );
}
