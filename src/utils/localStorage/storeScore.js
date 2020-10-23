export default function storeScore(playerID, point) {
    const playerScore = JSON.parse(
      localStorage.getItem(`player-${playerID}`) || "[]"
    );
    playerScore.push(point);
    localStorage.setItem(`player-${playerID}`, JSON.stringify(playerScore));
    return playerScore;
  }

  // to String lowercase einfügen