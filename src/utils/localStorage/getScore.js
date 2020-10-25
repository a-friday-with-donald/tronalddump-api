export default function getScore(playerID) {
  const playerScore = JSON.parse(
    localStorage.getItem(`player-${playerID}`) || "[]"
  );

  let score = 0;

  if (playerScore.length > 0) {
    playerScore.forEach((value) => {
      score += value;
    });
  } 

  return score;
}
