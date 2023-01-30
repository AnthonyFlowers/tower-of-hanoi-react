export default function solve(towerOne, towerTwo, towerThree) {
  let towerFrom = { ...towerOne };
  let towerTo = { ...towerThree };
  if (towerOne.rings.length % 2 === 0) {
    // nextMoves += 1;
    towerTo = { ...towerTwo };
  }
  towerTo.rings.unshift(towerFrom.rings.shift());
  towerFrom.setTower(towerFrom);
  towerTo.setTower(towerTo);
  swapWithRules(towerOne, towerTwo, towerThree);
}

function swapWithRules(towerOne, towerTwo, towerThree) {
  console.log(towerOne, towerTwo, towerThree);
  setTimeout(() => {
    if (isEmpty(towerTwo)) {
      swapWithRules(towerOne, towerThree, towerTwo);
    }
    if (
      !isEmpty(towerTwo) &&
      !(isOddOnOdd(towerOne, towerTwo) || isEvenOnEven(towerOne, towerTwo))
    ) {
      move(towerOne, towerTwo);
      swapWithRules(towerTwo, towerOne, towerThree);
    }
  }, 1000);
}

function move(t1, t2) {
  let towerFrom = { ...t1 };
  let towerTo = { ...t2 };
  towerTo.rings.unshift(towerFrom.rings.shift());
  towerFrom.setTower(towerFrom);
  towerTo.setTower(towerTo);
}

function isOddOnOdd(t1, t2) {
  return isOdd(topRing(t1)) && isOdd(topRing(t2));
}

function isEvenOnEven(t1, t2) {
  return !isOdd(topRing(t1)) && !isOdd(topRing(t2));
}

function topRing(tower) {
  return tower.rings[0];
}

function isOdd(ring) {
  return ring % 2 === 1;
}

function isEmpty(tower) {
  return tower.rings.length === 0;
}
