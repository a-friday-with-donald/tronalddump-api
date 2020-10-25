export default function deletePlayer(playerID) {
    localStorage.removeItem(`player-${playerID}`);
    //   returns if it was successful or not
    let result = false;
    if (!localStorage.getItem(`player-${playerID}`)) result = true;
    return result;
  }