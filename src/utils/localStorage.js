export function getScore (playerID) {
    const playerScore = JSON.parse(localStorage.getItem(`player-${playerID}`) || "[]");

    function sumScore (playerScore) {
        let sum = playerScore.reduce(function (acc, curr) {
            let sum = acc + curr;
            return sum
        });
        return sum;
    }

    let score = sumScore(playerScore);
    return score;
}

export function storeScore (playerID, point) {
    const playerScore = JSON.parse(localStorage.getItem(`player-${playerID}`) || "[]");
    playerScore.push(point);
    localStorage.setItem(`player-${playerID}`, JSON.stringify(playerScore));
    return playerScore;
}

export function deletePlayer (playerID) {
    let removePlayer = localStorage.remove(`player-${playerID}`);
    removePlayer.then(() => {
        console.log("Player removed successful");
        return "true";
    }, (err) => {
        console.log(err);
        return "false";
    });
}