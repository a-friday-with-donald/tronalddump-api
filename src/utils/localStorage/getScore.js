export default function getScore(playerID) {
  const playerScore = JSON.parse(
    localStorage.getItem(`player-${playerID}`) || "[]"
  );

  // helper function - please review
  function sumScore(playerScore) {
    let sum = playerScore.reduce(function (acc, curr) {
      let sum = acc + curr;
      return sum;
    });
    return sum;
  }
  // to avoid running the reduce function with an empty array
  let score = null;
  if (playerScore.length > 0) {
    score = sumScore(playerScore);
  } else {
    score = 0;
  }
  return score;
}
