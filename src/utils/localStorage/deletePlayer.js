export default function deletePlayer(playerID) {
    localStorage.removeItem(`player-${playerID}`);
    //   returns if it was successful or not
    const result = 0;
    return result;
  }