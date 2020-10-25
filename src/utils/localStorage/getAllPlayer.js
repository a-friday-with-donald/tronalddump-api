export default function getAllPlayers() {
  const playerAll = [];

  function sumScore(playerScore) {
    let sum = playerScore.reduce(function (acc, curr) {
      let sum = acc + curr;
      return sum;
    });
    return sum;
  }

  const keys = Object.keys(localStorage);

  const players = keys.map((key) => {
    if (key.test("player")) return key;
  });

  players.forEach((player) => {
    const playerScore = JSON.parse(localStorage.getItem("player"));
    const sum = sumScore(playerScore);
    playerAll.push({ player, sum });
  });

  return playerAll;
}
