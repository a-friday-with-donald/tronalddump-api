export default function getScore(playerID) {
    const playerScore = JSON.parse(
      localStorage.getItem(`player-${playerID}`) || "[]"
    );
  
    //   helper function - please review
    function sumScore(playerScore) {
      let sum = playerScore.reduce(function (acc, curr) {
        let sum = acc + curr;
        return sum;
      });
      return sum;
    }
  
    let score = sumScore(playerScore);
    return score;
  }